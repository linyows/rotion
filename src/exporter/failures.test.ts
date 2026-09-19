import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { APIResponseError, RequestTimeoutError } from '@notionhq/client'
import {
  HTTPStatusError,
  StrictModeError,
  isTransientError,
  collectFailures,
  reportFailure,
  reportExtraFailure,
} from './failures.js'
import { warn } from './log.js'

// Collect what is printed with console.warn while fn runs
async function captureWarnings (fn: () => unknown): Promise<string[]> {
  const original = console.warn
  const lines: string[] = []
  console.warn = (...args: unknown[]) => { lines.push(args.map(String).join(' ')) }
  try {
    await fn()
  } finally {
    console.warn = original
  }
  return lines
}

async function withStrict (fn: () => Promise<void>): Promise<void> {
  const original = process.env.ROTION_STRICT
  process.env.ROTION_STRICT = 'true'
  try {
    await fn()
  } finally {
    if (original === undefined) {
      delete process.env.ROTION_STRICT
    } else {
      process.env.ROTION_STRICT = original
    }
  }
}

const notionError = (code: string, status: number) => new APIResponseError({
  code: code as APIResponseError['code'],
  status,
  message: code,
  headers: {} as never,
  rawBodyText: '',
  additional_data: undefined,
})

test('isTransientError tells server errors and rate limits from permanent HTTP errors', () => {
  for (const status of [500, 502, 503, 504, 408, 429]) {
    assert.ok(isTransientError(new HTTPStatusError(status, 'https://example.com')), `${status}`)
  }
  for (const status of [400, 401, 403, 404, 410]) {
    assert.not.ok(isTransientError(new HTTPStatusError(status, 'https://example.com')), `${status}`)
  }
})

test('isTransientError tells retryable notion errors from permanent ones', () => {
  for (const [code, status] of [['rate_limited', 429], ['internal_server_error', 500], ['service_unavailable', 503], ['gateway_timeout', 504]] as const) {
    assert.ok(isTransientError(notionError(code, status)), code)
  }
  assert.ok(isTransientError(new RequestTimeoutError()))
  for (const [code, status] of [['object_not_found', 404], ['restricted_resource', 403], ['unauthorized', 401], ['validation_error', 400]] as const) {
    assert.not.ok(isTransientError(notionError(code, status)), code)
  }
})

test('isTransientError follows the cause of a wrapping error', () => {
  const permanent = new Error('saveImage download error', { cause: new HTTPStatusError(404, 'https://example.com') })
  assert.not.ok(isTransientError(permanent))
  const transient = new Error('request to notion api failed', { cause: notionError('rate_limited', 429) })
  assert.ok(isTransientError(transient))
})

test('isTransientError counts an unknown error as transient', () => {
  assert.ok(isTransientError(new Error('socket hang up')))
  assert.ok(isTransientError('string error'))
})

test('collectFailures is complete when nothing, or only a permanent failure, is reported', async () => {
  const none = await collectFailures(async () => 'value')
  assert.equal(none, { value: 'value', complete: true })

  const permanent = await collectFailures(async () => {
    reportFailure('test', new HTTPStatusError(404, 'https://example.com'))
    return 'value'
  })
  assert.equal(permanent.complete, true)
})

test('collectFailures is incomplete when a transient failure is reported', async () => {
  const res = await collectFailures(async () => {
    reportFailure('test', new HTTPStatusError(503, 'https://example.com'))
    return 'value'
  })
  assert.equal(res, { value: 'value', complete: false })
})

test('collectFailures passes a nested transient failure to the outer call', async () => {
  let inner: { complete: boolean } | undefined
  let sibling: { complete: boolean } | undefined
  const outer = await collectFailures(async () => {
    inner = await collectFailures(async () => {
      reportFailure('test', new HTTPStatusError(503, 'https://example.com'))
    })
    sibling = await collectFailures(async () => {})
  })
  assert.equal(inner?.complete, false)
  assert.equal(sibling?.complete, true, 'a failure must not leak into a sibling call')
  assert.equal(outer.complete, false)
})

test('collectFailures keeps concurrent calls apart', async () => {
  const [failed, clean] = await Promise.all([
    collectFailures(async () => {
      await new Promise(resolve => setTimeout(resolve, 5))
      reportFailure('test', new HTTPStatusError(503, 'https://example.com'))
    }),
    collectFailures(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    }),
  ])
  assert.equal(failed.complete, false)
  assert.equal(clean.complete, true)
})

test('reportFailure outside collectFailures does nothing', () => {
  reportFailure('test', new HTTPStatusError(503, 'https://example.com'))
})

test('warn prints one prefixed line with the first line of the error message', async () => {
  const lines = await captureWarnings(() => {
    warn('failed to get image of block abc', new Error('request failed -- rate_limited\n  args: {"a":1}'))
    warn('no error')
  })
  assert.equal(lines, [
    '[rotion] failed to get image of block abc: request failed -- rate_limited',
    '[rotion] no error',
  ])
})

test('reportFailure warns about permanent and transient failures alike', async () => {
  const lines = await captureWarnings(async () => {
    await collectFailures(async () => {
      reportFailure('image of block a', new HTTPStatusError(404, 'https://example.com/a.png'))
      reportFailure('image of block b', new HTTPStatusError(503, 'https://example.com/b.png'))
    })
  })
  assert.equal(lines, [
    '[rotion] failed to get image of block a: unexpected status 404: https://example.com/a.png',
    '[rotion] failed to get image of block b: unexpected status 503: https://example.com/b.png',
  ])
})

test('reportFailure throws StrictModeError when ROTION_STRICT is true, even for a permanent failure', async () => {
  await withStrict(async () => {
    await captureWarnings(() => {
      try {
        reportFailure('image of block a', new HTTPStatusError(404, 'https://example.com/a.png'))
        assert.unreachable('should have thrown')
      } catch (e) {
        assert.instance(e, StrictModeError)
        assert.match((e as Error).message, /image of block a/)
        assert.instance((e as Error).cause, HTTPStatusError)
      }
    })
  })
})

test('reportFailure passes a StrictModeError on without warning again', async () => {
  await withStrict(async () => {
    const lines = await captureWarnings(() => {
      try {
        try {
          reportFailure('image of block a', new HTTPStatusError(404, 'https://example.com/a.png'))
        } catch (e) {
          // An outer catch, such as the one around each block, reports what it caught
          reportFailure('contents of image block a', e)
        }
        assert.unreachable('should have thrown')
      } catch (e) {
        assert.instance(e, StrictModeError)
      }
    })
    assert.equal(lines.length, 1, `expected one warning, got ${JSON.stringify(lines)}`)
  })
})

test('reportExtraFailure only warns: it neither fails a strict build nor keeps a result out of the cache', async () => {
  await withStrict(async () => {
    let res: { complete: boolean } | undefined
    const lines = await captureWarnings(async () => {
      res = await collectFailures(async () => {
        reportExtraFailure('metadata of https://example.com', new HTTPStatusError(503, 'https://example.com'))
      })
    })
    assert.equal(res?.complete, true)
    assert.equal(lines, ['[rotion] failed to get metadata of https://example.com: unexpected status 503: https://example.com'])
  })
})

test.run()
