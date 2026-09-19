import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { createRequire } from 'node:module'
import { promisify } from 'node:util'
import { pathToFileURL } from 'node:url'
import { config, configure, resetConfiguration, httpOptions } from './variables.js'

// Set environment variables while fn runs, and restore them afterwards
async function withEnv (vars: Record<string, string | undefined>, fn: () => unknown): Promise<void> {
  const original: Record<string, string | undefined> = {}
  for (const [key, value] of Object.entries(vars)) {
    original[key] = process.env[key]
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
  try {
    await fn()
  } finally {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
    resetConfiguration()
  }
}

const numbers = [
  ['ROTION_WAITTIME', 'waitTime', 0],
  ['ROTION_LIMITED_WAITTIME', 'limitedWaitTime', 60 * 1000],
  ['ROTION_CACHE_AVAILABLE_DURATION', 'cacheAvailableDuration', 2 * 60 * 1000],
  ['ROTION_TIMEOUT', 'timeout', 1500],
  ['ROTION_WEBP_QUALITY', 'webpQuality', 95],
  ['ROTION_MAX_REDIRECTS', 'maxRedirects', 5],
] as const

for (const [envKey, name, defaultValue] of numbers) {
  test(`config().${name} is the number in ${envKey}`, async () => {
    await withEnv({ [envKey]: '300' }, () => {
      assert.equal(config()[name], 300)
      assert.type(config()[name], 'number')
    })
  })

  test(`config().${name} defaults to ${defaultValue} when ${envKey} is unset or not a number`, async () => {
    for (const value of [undefined, '', 'abc']) {
      await withEnv({ [envKey]: value }, () => {
        assert.equal(config()[name], defaultValue, `${envKey}=${value}`)
      })
    }
  })
}

test('config() reads the environment when it is called, not when the module is imported', async () => {
  await withEnv({ NOTION_TOKEN: undefined, ROTION_CACHEDIR: undefined, ROTION_INCREMENTAL_CACHE: undefined }, async () => {
    assert.equal(config().auth, undefined)
    assert.equal(config().cacheDir, '.cache')
    assert.equal(config().incrementalCache, false)
    await withEnv({ NOTION_TOKEN: 'secret_a', ROTION_CACHEDIR: '/tmp/rotion', ROTION_INCREMENTAL_CACHE: 'true' }, () => {
      assert.equal(config().auth, 'secret_a')
      assert.equal(config().cacheDir, '/tmp/rotion')
      assert.equal(config().incrementalCache, true)
    })
  })
})

test('configure() wins over the environment, and undefined goes back to it', async () => {
  await withEnv({ NOTION_TOKEN: 'from-env', ROTION_DOCROOT: 'from-env' }, () => {
    configure({ auth: 'from-code', docRoot: 'storage' })
    assert.equal(config().auth, 'from-code')
    assert.equal(config().docRoot, 'storage')

    configure({ docRoot: undefined })
    assert.equal(config().auth, 'from-code', 'a later call keeps what it does not mention')
    assert.equal(config().docRoot, 'from-env')

    resetConfiguration()
    assert.equal(config().auth, 'from-env')
  })
})

test('config().userAgent is the name and version in the package.json of the working directory', async () => {
  await withEnv({ ROTION_UA: undefined }, () => {
    assert.match(config().userAgent, /^rotion\/\d+\.\d+\.\d+/)
  })
})

test('config().userAgent falls back to "rotion" without a package.json', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rotion-ua-test-'))
  const cwd = process.cwd()
  try {
    process.chdir(dir)
    await withEnv({ ROTION_UA: undefined }, () => {
      assert.equal(config().userAgent, 'rotion')
    })
    const other = await mkdtemp(join(tmpdir(), 'rotion-ua-test-'))
    try {
      process.chdir(other)
      await writeFile(join(other, 'package.json'), '{ not json')
      await withEnv({ ROTION_UA: undefined }, () => {
        assert.equal(config().userAgent, 'rotion', 'an unreadable package.json falls back too')
      })
    } finally {
      process.chdir(dir)
      await rm(other, { recursive: true, force: true })
    }
  } finally {
    process.chdir(cwd)
    await rm(dir, { recursive: true, force: true })
  }
})

// The module graph of this process is already loaded, so import rotion in a
// fresh process whose working directory has no package.json.
test('importing rotion does not require a package.json in the working directory', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rotion-import-test-'))
  const tsx = createRequire(import.meta.url).resolve('tsx')
  const index = new URL('./index.ts', import.meta.url).href
  try {
    const { stdout } = await promisify(execFile)(
      process.execPath,
      ['--import', pathToFileURL(tsx).href, '--input-type=module', '-e',
        `const m = await import(${JSON.stringify(index)}); process.stdout.write(typeof m.FetchBlocks + ' ' + typeof m.configure)`],
      { cwd: dir },
    )
    assert.equal(stdout, 'function function')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('httpOptions() uses the current timeout and user agent', async () => {
  await withEnv({ ROTION_TIMEOUT: '2500', ROTION_UA: 'curl' }, () => {
    assert.equal(httpOptions(), { timeout: 2500, headers: { 'User-Agent': 'curl', Accept: '*/*' } })
  })
})

test.run()
