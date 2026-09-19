import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { mkdtemp, mkdir, rm, writeFile, utimes, readdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { parseDuration, parseTime, run } from './cli.js'

// Run the command line with the given arguments, and capture what it prints
async function cli (args: string[]): Promise<{ code: number, out: string, err: string }> {
  const original = { log: console.log, error: console.error }
  let out = ''
  let err = ''
  console.log = (...a: unknown[]) => { out += a.join(' ') + '\n' }
  console.error = (...a: unknown[]) => { err += a.join(' ') + '\n' }
  try {
    const code = await run(args)
    return { code, out, err }
  } finally {
    console.log = original.log
    console.error = original.error
  }
}

// A cache directory with one file used 30 days ago and one used now
async function withCache (fn: (cache: string) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), 'rotion-cli-test-'))
  const cache = join(root, 'cache')
  await mkdir(cache)
  const old = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  await writeFile(join(cache, 'notion.pages.retrieve-old'), '{}')
  await utimes(join(cache, 'notion.pages.retrieve-old'), old, old)
  await writeFile(join(cache, 'notion.pages.retrieve-new'), '{}')
  const original = { cache: process.env.ROTION_CACHEDIR, docroot: process.env.ROTION_DOCROOT }
  process.env.ROTION_CACHEDIR = cache
  process.env.ROTION_DOCROOT = join(root, 'public')
  try {
    await fn(cache)
  } finally {
    for (const [key, value] of [['ROTION_CACHEDIR', original.cache], ['ROTION_DOCROOT', original.docroot]] as const) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
    await rm(root, { recursive: true, force: true })
  }
}

test('parseDuration reads seconds, minutes, hours and days', () => {
  assert.equal(parseDuration('30s'), 30 * 1000)
  assert.equal(parseDuration('30m'), 30 * 60 * 1000)
  assert.equal(parseDuration('12h'), 12 * 60 * 60 * 1000)
  assert.equal(parseDuration('7d'), 7 * 24 * 60 * 60 * 1000)
  for (const invalid of ['7', 'd', '1.5d', '7w', '-1d', '']) {
    assert.equal(parseDuration(invalid), undefined, invalid)
  }
})

test('parseTime reads an ISO 8601 date or Unix milliseconds', () => {
  assert.equal(parseTime('2026-09-20T09:00:00Z')?.toISOString(), '2026-09-20T09:00:00.000Z')
  assert.equal(parseTime('1789894800000')?.getTime(), 1789894800000)
  assert.equal(parseTime('yesterday'), undefined)
})

test('rotion prune --dry-run lists unused files without removing them', async () => {
  await withCache(async (cache) => {
    const { code, out } = await cli(['prune', '--unused-for', '7d', '--dry-run'])
    assert.equal(code, 0)
    assert.match(out, /notion\.pages\.retrieve-old\n/)
    assert.not.match(out, /retrieve-new/)
    assert.match(out, /would remove 1 file not used since /)
    assert.equal((await readdir(cache)).sort(), ['notion.pages.retrieve-new', 'notion.pages.retrieve-old'])
  })
})

test('rotion prune --unused-for removes files not used for that long', async () => {
  await withCache(async (cache) => {
    const { code, out } = await cli(['prune', '--unused-for=7d'])
    assert.equal(code, 0)
    assert.match(out, /removed 1 file not used since /)
    assert.equal(await readdir(cache), ['notion.pages.retrieve-new'])
  })
})

test('rotion prune --before removes files not used since that time', async () => {
  await withCache(async (cache) => {
    const { code } = await cli(['prune', '--before', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()])
    assert.equal(code, 0)
    assert.equal(await readdir(cache), ['notion.pages.retrieve-new'])
  })
})

for (const [args, message] of [
  [['prune'], /--unused-for or --before is required/],
  [['prune', '--unused-for', '7w'], /invalid duration: 7w/],
  [['prune', '--unused-for'], /--unused-for needs a value/],
  [['prune', '--before', 'yesterday'], /invalid time: yesterday/],
  [['prune', '--force'], /unknown option: --force/],
  [['clean'], /unknown command: clean/],
] as const) {
  test(`rotion ${args.join(' ')} fails with usage`, async () => {
    const { code, err } = await cli([...args])
    assert.equal(code, 2)
    assert.match(err, message)
    assert.match(err, /Usage: rotion prune/)
  })
}

test('rotion --help and rotion prune --help show the usage', async () => {
  for (const args of [['--help'], ['prune', '--help']]) {
    const { code, out } = await cli(args)
    assert.equal(code, 0)
    assert.match(out, /Usage: rotion prune/)
  }
})

test('the rotion command runs from its entry point', async () => {
  await withCache(async () => {
    const { stdout } = await promisify(execFile)(
      process.execPath,
      ['--import', 'tsx', new URL('./bin.ts', import.meta.url).pathname, 'prune', '--unused-for', '7d', '--dry-run'],
    )
    assert.match(stdout, /would remove 1 file/)
  })
  try {
    await promisify(execFile)(process.execPath, ['--import', 'tsx', new URL('./bin.ts', import.meta.url).pathname, 'prune'])
    assert.unreachable('should exit with a non-zero code')
  } catch (e) {
    assert.equal((e as { code: number }).code, 2)
  }
})

test.run()
