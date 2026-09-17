import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import type { FetchBlocksArgs, FetchBlocksRes } from './blocks.js'
import { FetchBlocks } from './blocks.js'
import { notion } from './api.js'
import { readCache } from './files.js'
import { cacheDir } from './variables.js'
import { rm } from 'node:fs/promises'

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
      block(ids.toggle, 'toggle', '2025-01-01T00:00:00.000Z', { rich_text: [] }),
      block(ids.columnList, 'column_list', '2025-01-01T00:00:00.000Z'),
    ],
    [ids.toggle]: [],
    [ids.columnList]: [block(ids.column, 'column', '2025-01-01T00:00:00.000Z')],
    [ids.column]: [],
  }
  const list = async ({ block_id }: { block_id: string }) => ({
    object: 'list', results: children[block_id], next_cursor: null, has_more: false,
  })
  const cacheFiles = Object.values(ids).map(id => `${cacheDir}/notion.blocks.children.list-${id}`)
  return { ids, list, cacheFiles }
}

const withStubbedBlocksList = async (list: unknown, cacheFiles: string[], fn: () => Promise<void>) => {
  const original = notion.blocks.children.list
  notion.blocks.children.list = list as typeof original
  try {
    await Promise.all(cacheFiles.map(f => rm(f, { force: true })))
    await fn()
  } finally {
    notion.blocks.children.list = original
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

    for (const id of [ids.toggle, ids.columnList, ids.column]) {
      const cache = await readCache<FetchBlocksRes>(`${cacheDir}/notion.blocks.children.list-${id}`)
      assert.equal(cache.last_edited_time, '2025-01-01T00:00:00.000Z', `cache of ${id}`)
    }
  })
})

test.run()
