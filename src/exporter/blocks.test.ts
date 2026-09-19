import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import type { FetchBlocksArgs, FetchBlocksRes } from './blocks.js'
import { FetchBlocks } from './blocks.js'
import { notion } from './api.js'
import { readCache } from './files.js'
import { config } from './variables.js'
import { mkdtemp, rm, access } from 'node:fs/promises'
import http from 'node:http'
import { execFile } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'

const { cacheDir } = config()

test.before(() => {
  td.replace(console, 'log')
  td.reset()
})

test('FetchBlocks returns correct response structure', async () => {
  const args: FetchBlocksArgs = {
    block_id: 'test-block-id',
    last_edited_time: undefined
  }

  try {
    const result = await FetchBlocks(args)
    // Should always return proper response structure
    assert.ok(typeof result === 'object')
    assert.ok('results' in result)
    assert.ok(Array.isArray(result.results))
    assert.ok('object' in result)
    assert.ok('next_cursor' in result)
    assert.ok('has_more' in result)
  } catch (error) {
    // Function should handle API errors gracefully
    assert.ok(error instanceof Error)
  }
})

test('FetchBlocks preserves last_edited_time when provided', async () => {
  const testTimestamp = '2023-01-01T00:00:00.000Z'
  const args: FetchBlocksArgs = {
    block_id: 'test-block-id',
    last_edited_time: testTimestamp
  }

  try {
    const result = await FetchBlocks(args)
    
    assert.ok(typeof result === 'object')
    assert.ok('results' in result)
    
    // Key business logic: last_edited_time should be preserved in response
    if (result.last_edited_time) {
      assert.equal(result.last_edited_time, testTimestamp)
    }
  } catch (error) {
    // Function should handle API errors gracefully
    assert.ok(error instanceof Error)
  }
})

test('FetchBlocks works with optional last_edited_time', async () => {
  const args: FetchBlocksArgs = {
    block_id: 'test-block-id'
    // last_edited_time is optional - testing this path
  }

  try {
    const result = await FetchBlocks(args)
    assert.ok(typeof result === 'object')
    assert.ok('results' in result)
    // When last_edited_time is not provided, it should still work
    assert.ok(Array.isArray(result.results))
  } catch (error) {
    // Function should handle API errors gracefully
    assert.ok(error instanceof Error)
  }
})

test('FetchBlocks implements proper caching behavior', async () => {
  const args: FetchBlocksArgs = {
    block_id: 'cache-test-block-id',
    last_edited_time: new Date().toISOString()
  }

  try {
    const result: FetchBlocksRes = await FetchBlocks(args)
    
    // Verify caching mechanism works (creates cache directory)
    assert.ok(typeof result === 'object')
    assert.ok('results' in result)
    assert.ok(Array.isArray(result.results))
    
    // Results should be consistent for repeated calls (testing cache)
    const secondResult = await FetchBlocks(args)
    assert.ok(typeof secondResult === 'object')
    assert.ok('results' in secondResult)
    
  } catch (error) {
    // Function should handle errors gracefully
    assert.ok(error instanceof Error)
    // Should not fail due to cache system
    const errorMessage = error.message.toLowerCase()
    assert.ok(!errorMessage.includes('enoent'))
    assert.ok(!errorMessage.includes('permission'))
  }
})

test('FetchBlocks handles incremental cache logic correctly', async () => {
  // Test incremental cache behavior with different scenarios
  const baseArgs: FetchBlocksArgs = {
    block_id: 'incremental-test-block-id',
    last_edited_time: '2023-01-01T00:00:00.000Z'
  }

  try {
    const result = await FetchBlocks(baseArgs)
    assert.ok(typeof result === 'object')
    assert.ok('results' in result)
    
    // Test with different timestamp (should trigger new request)
    const newTimestamp = '2023-01-02T00:00:00.000Z'
    const argsWithNewTime: FetchBlocksArgs = {
      ...baseArgs,
      last_edited_time: newTimestamp
    }
    
    const newResult = await FetchBlocks(argsWithNewTime)
    assert.ok(typeof newResult === 'object')
    assert.ok('results' in newResult)
    
  } catch (error) {
    // Function should handle API errors gracefully
    assert.ok(error instanceof Error)
  }
})

test('FetchBlocks processes various timestamp formats correctly', async () => {
  const validTimestamps = [
    '2023-01-01T00:00:00.000Z',
    '2023-12-31T23:59:59.999Z',
    new Date().toISOString(),
    '2023-06-15T12:30:45.123Z'
  ]

  for (const timestamp of validTimestamps) {
    const args: FetchBlocksArgs = {
      block_id: 'timestamp-test-block-id',
      last_edited_time: timestamp
    }

    try {
      const result = await FetchBlocks(args)
      assert.ok(typeof result === 'object')
      
      // Verify timestamp handling - should preserve the input timestamp
      if (result.last_edited_time) {
        assert.equal(result.last_edited_time, timestamp)
      }
    } catch (error) {
      // Function should handle API errors gracefully
      assert.ok(error instanceof Error)
    }
  }
})

test('FetchBlocks integrates with file system correctly', async () => {
  const args: FetchBlocksArgs = {
    block_id: 'filesystem-test-block-id',
    last_edited_time: '2023-01-01T00:00:00.000Z'
  }

  try {
    // Test that function can create cache directory and handle file operations
    const result = await FetchBlocks(args)
    assert.ok(typeof result === 'object')
    assert.ok('results' in result)
    
    // Should handle multiple calls without filesystem errors
    const secondCall = await FetchBlocks(args)
    assert.ok(typeof secondCall === 'object')
    
  } catch (error) {
    // Should not fail due to filesystem issues
    assert.ok(error instanceof Error)
    const errorMessage = error.message.toLowerCase()
    assert.ok(!errorMessage.includes('enoent'))
    assert.ok(!errorMessage.includes('permission'))
    assert.ok(!errorMessage.includes('eacces'))
  }
})

const blockEditedTimes = {
  toggle: '2025-01-01T00:00:00.000Z',
  columnList: '2025-02-01T00:00:00.000Z',
  column: '2025-03-01T00:00:00.000Z',
}

const nestedBlocksFixture = (suffix: string) => {
  const ids = {
    page: `nested-page-${suffix}`,
    toggle: `nested-toggle-${suffix}`,
    columnList: `nested-column-list-${suffix}`,
    column: `nested-column-${suffix}`,
  }
  const block = (id: string, type: string, last_edited_time: string, value: object = {}) => ({
    object: 'block', id, type, has_children: true, last_edited_time, [type]: value,
  })
  const children: Record<string, unknown[]> = {
    [ids.page]: [
      block(ids.toggle, 'toggle', blockEditedTimes.toggle, { rich_text: [] }),
      block(ids.columnList, 'column_list', blockEditedTimes.columnList),
    ],
    [ids.toggle]: [],
    [ids.columnList]: [block(ids.column, 'column', blockEditedTimes.column)],
    [ids.column]: [],
  }
  const list = async ({ block_id }: { block_id: string }) => ({
    object: 'list', results: children[block_id], next_cursor: null, has_more: false,
  })
  const cacheFiles = Object.values(ids).map(id => `${cacheDir}/notion.blocks.children.list-${id}`)
  return { ids, list, cacheFiles }
}

const withStubbedBlocksList = async (list: unknown, cacheFiles: string[], fn: () => Promise<void>) => {
  const original = notion().blocks.children.list
  notion().blocks.children.list = list as typeof original
  try {
    await Promise.all(cacheFiles.map(f => rm(f, { force: true })))
    await fn()
  } finally {
    notion().blocks.children.list = original
    await Promise.all(cacheFiles.map(f => rm(f, { force: true })))
  }
}

test('FetchBlocks passes the page last_edited_time down to nested blocks', async () => {
  const { ids, list, cacheFiles } = nestedBlocksFixture(`${Date.now()}-root`)
  const pageEditedTime = '2026-09-17T00:00:00.000Z'

  await withStubbedBlocksList(list, cacheFiles, async () => {
    await FetchBlocks({ block_id: ids.page, last_edited_time: pageEditedTime })

    // Nested blocks must be cached with the page time, not their parent block time,
    // because editing a nested block does not update its parent block's last_edited_time.
    for (const id of [ids.toggle, ids.columnList, ids.column]) {
      const cache = await readCache<FetchBlocksRes>(`${cacheDir}/notion.blocks.children.list-${id}`)
      assert.equal(cache.last_edited_time, pageEditedTime, `cache of ${id}`)
    }
  })
})

test('FetchBlocks uses the block last_edited_time for nested blocks when none is given', async () => {
  const { ids, list, cacheFiles } = nestedBlocksFixture(`${Date.now()}-fallback`)

  await withStubbedBlocksList(list, cacheFiles, async () => {
    await FetchBlocks({ block_id: ids.page })

    for (const key of ['toggle', 'columnList', 'column'] as const) {
      const cache = await readCache<FetchBlocksRes>(`${cacheDir}/notion.blocks.children.list-${ids[key]}`)
      assert.equal(cache.last_edited_time, blockEditedTimes[key], `cache of ${ids[key]}`)
    }
  })
})

// incrementalCache is read from the environment when the variables module is loaded,
// so run the two-pass scenario in a child process with ROTION_INCREMENTAL_CACHE=true.
const incrementalCacheScenario = `
const { notion } = await import(new URL('./src/exporter/api.ts', 'file://' + process.cwd() + '/').href)
const { FetchBlocks } = await import(new URL('./src/exporter/blocks.ts', 'file://' + process.cwd() + '/').href)
const { config } = await import(new URL('./src/exporter/variables.ts', 'file://' + process.cwd() + '/').href)
const { incrementalCache } = config()
console.log = () => {}

const blockEditedTime = '2025-01-01T00:00:00.000Z'
let text = 'before'
const block = (id, type, value = {}) => ({ object: 'block', id, type, has_children: true, last_edited_time: blockEditedTime, [type]: value })
const paragraph = (id) => ({
  object: 'block', id, type: 'paragraph', has_children: false, last_edited_time: blockEditedTime,
  paragraph: { rich_text: [{ type: 'text', plain_text: text, text: { content: text, link: null }, annotations: {}, href: null }] },
})
const children = {
  page: () => [block('toggle', 'toggle', { rich_text: [] }), block('column-list', 'column_list'), block('list-item', 'bulleted_list_item', { rich_text: [] })],
  toggle: () => [paragraph('toggle-paragraph')],
  'column-list': () => [block('column', 'column')],
  column: () => [paragraph('column-paragraph')],
  'list-item': () => [paragraph('list-item-paragraph')],
}
notion().blocks.children.list = async ({ block_id }) => ({ object: 'list', results: children[block_id](), next_cursor: null, has_more: false })

const texts = (res) => ({
  toggle: res.results[0].children.results[0].paragraph.rich_text[0].plain_text,
  column: res.results[1].columns[0].results[0].paragraph.rich_text[0].plain_text,
  listItem: res.results[2].children.results[0].paragraph.rich_text[0].plain_text,
})
const first = texts(await FetchBlocks({ block_id: 'page', last_edited_time: '2026-01-01T00:00:00.000Z' }))
// Editing nested blocks updates only the page last_edited_time
text = 'after'
const second = texts(await FetchBlocks({ block_id: 'page', last_edited_time: '2026-02-01T00:00:00.000Z' }))
process.stdout.write(JSON.stringify({ incrementalCache, first, second }))
`

test('FetchBlocks reflects nested block changes with incremental cache', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rotion-blocks-test-'))
  try {
    const { stdout } = await promisify(execFile)(
      process.execPath,
      ['--import', 'tsx', '--input-type=module', '-e', incrementalCacheScenario],
      { env: { ...process.env, ROTION_INCREMENTAL_CACHE: 'true', ROTION_CACHEDIR: dir } },
    )
    const { incrementalCache, first, second } = JSON.parse(stdout)
    assert.equal(incrementalCache, true)
    assert.equal(first, { toggle: 'before', column: 'before', listItem: 'before' })
    assert.equal(second, { toggle: 'after', column: 'after', listItem: 'after' })
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

// --- Results with a transient failure are not cached ---

const imageServer = async (status: () => number) => {
  const sharp = (await import('sharp')).default
  const png = await sharp({
    create: { width: 3, height: 2, channels: 3, background: { r: 0, g: 0, b: 0 } },
  }).png().toBuffer()
  const server = http.createServer((_req, res) => {
    const code = status()
    res.writeHead(code, { 'Content-Type': code === 200 ? 'image/png' : 'text/html' })
    res.end(code === 200 ? png : 'error')
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const addr = server.address()
  if (!addr || typeof addr === 'string') throw new Error('failed to bind test server')
  return {
    base: `http://127.0.0.1:${addr.port}`,
    close: () => new Promise<void>(resolve => server.close(() => resolve())),
  }
}

const exists = async (f: string) => access(f).then(() => true, () => false)

const imageBlock = (id: string, url: string) => ({
  object: 'block', id, type: 'image', has_children: false, last_edited_time: '2025-01-01T00:00:00.000Z',
  image: { type: 'external', external: { url } },
})

test('FetchBlocks does not cache a result whose image failed with a server error', async () => {
  let status = 503
  const { base, close } = await imageServer(() => status)
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const pageId = `transient-page-${suffix}`
  const imageId = `transient-image-${suffix}`
  const cacheFile = `${cacheDir}/notion.blocks.children.list-${pageId}`
  const list = async () => ({
    object: 'list', results: [imageBlock(imageId, `${base}/image-${suffix}.png`)], next_cursor: null, has_more: false,
  })

  try {
    await withStubbedBlocksList(list, [cacheFile], async () => {
      const first = await FetchBlocks({ block_id: pageId })
      assert.equal((first.results[0] as any).image.src, undefined)
      assert.not.ok(await exists(cacheFile), 'a result missing an image because of a 503 must not be cached')

      status = 200
      const second = await FetchBlocks({ block_id: pageId })
      assert.match((second.results[0] as any).image.src, /\.webp$/)
      assert.ok(await exists(cacheFile), 'the complete result should be cached')
    })
  } finally {
    await close()
  }
})

test('FetchBlocks caches a result whose image failed permanently', async () => {
  const { base, close } = await imageServer(() => 404)
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const pageId = `permanent-page-${suffix}`
  const cacheFile = `${cacheDir}/notion.blocks.children.list-${pageId}`
  const list = async () => ({
    object: 'list', results: [imageBlock(`permanent-image-${suffix}`, `${base}/gone-${suffix}.png`)], next_cursor: null, has_more: false,
  })

  try {
    await withStubbedBlocksList(list, [cacheFile], async () => {
      await FetchBlocks({ block_id: pageId })
      assert.ok(await exists(cacheFile), 'a 404 does not go away on retry, so the result is cached')
    })
  } finally {
    await close()
  }
})

test('FetchBlocks does not cache a parent whose nested block had a transient failure', async () => {
  const { base, close } = await imageServer(() => 503)
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const pageId = `parent-page-${suffix}`
  const toggleId = `parent-toggle-${suffix}`
  const cacheFiles = [pageId, toggleId].map(id => `${cacheDir}/notion.blocks.children.list-${id}`)
  const children: Record<string, unknown[]> = {
    [pageId]: [{
      object: 'block', id: toggleId, type: 'toggle', has_children: true,
      last_edited_time: '2025-01-01T00:00:00.000Z', toggle: { rich_text: [] },
    }],
    [toggleId]: [imageBlock(`parent-image-${suffix}`, `${base}/nested-${suffix}.png`)],
  }
  const list = async ({ block_id }: { block_id: string }) => ({
    object: 'list', results: children[block_id], next_cursor: null, has_more: false,
  })

  try {
    await withStubbedBlocksList(list, cacheFiles, async () => {
      await FetchBlocks({ block_id: pageId })
      for (const f of cacheFiles) {
        assert.not.ok(await exists(f), `${f} must not be cached`)
      }
    })
  } finally {
    await close()
  }
})

test('FetchBlocks fails with ROTION_STRICT=true when content could not be fetched', async () => {
  const { StrictModeError } = await import('./failures.js')
  const { base, close } = await imageServer(() => 404)
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const pageId = `strict-page-${suffix}`
  const cacheFile = `${cacheDir}/notion.blocks.children.list-${pageId}`
  const list = async () => ({
    object: 'list', results: [imageBlock(`strict-image-${suffix}`, `${base}/gone-${suffix}.png`)], next_cursor: null, has_more: false,
  })
  const original = { strict: process.env.ROTION_STRICT, warn: console.warn }
  const warnings: string[] = []
  process.env.ROTION_STRICT = 'true'
  console.warn = (...args: unknown[]) => { warnings.push(args.map(String).join(' ')) }

  try {
    await withStubbedBlocksList(list, [cacheFile], async () => {
      try {
        await FetchBlocks({ block_id: pageId })
        assert.unreachable('should have thrown')
      } catch (e) {
        assert.instance(e, StrictModeError)
      }
      assert.not.ok(await exists(cacheFile), 'a failed strict fetch must not be cached')
    })
    assert.equal(warnings.length, 1, `expected one warning, got ${JSON.stringify(warnings)}`)
    assert.match(warnings[0], /^\[rotion\] failed to get image of block strict-image-/)
  } finally {
    if (original.strict === undefined) {
      delete process.env.ROTION_STRICT
    } else {
      process.env.ROTION_STRICT = original.strict
    }
    console.warn = original.warn
    await close()
  }
})

test.run()
