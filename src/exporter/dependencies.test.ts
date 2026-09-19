import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { FetchBlocks } from './blocks.js'
import { notion } from './api.js'
import { readCache } from './files.js'
import { collectDependencies, recordDependency, recordDependencies } from './dependencies.js'
import type { FetchBlocksRes } from './blocks.js'

// A small fake of the Notion API: pages with a title and a last_edited_time,
// block children, and block parents. Tests edit it between two fetches.
function fakeNotion () {
  const state = {
    pages: {} as Record<string, { title: string, edited: string }>,
    children: {} as Record<string, () => unknown[]>,
    parents: {} as Record<string, string>,
    calls: { list: [] as string[], pages: [] as string[] },
  }
  const client = notion()
  const original = {
    list: client.blocks.children.list,
    retrieveBlock: client.blocks.retrieve,
    retrievePage: client.pages.retrieve,
  }
  client.blocks.children.list = (async ({ block_id }: { block_id: string }) => {
    state.calls.list.push(block_id)
    return { object: 'list', results: state.children[block_id](), next_cursor: null, has_more: false }
  }) as never
  client.blocks.retrieve = (async ({ block_id }: { block_id: string }) => ({
    object: 'block', id: block_id, parent: { type: 'page_id', page_id: state.parents[block_id] },
  })) as never
  client.pages.retrieve = (async ({ page_id }: { page_id: string }) => {
    state.calls.pages.push(page_id)
    const page = state.pages[page_id]
    return {
      object: 'page', id: page_id, last_edited_time: page.edited, parent: { type: 'workspace', workspace: true },
      properties: { title: { id: 'title', type: 'title', title: [{ plain_text: page.title }] } },
    }
  }) as never
  const restore = () => {
    client.blocks.children.list = original.list
    client.blocks.retrieve = original.retrieveBlock
    client.pages.retrieve = original.retrievePage
  }
  return { state, restore }
}

const text = (id: string, content: string) => ({
  object: 'block', id, type: 'paragraph', has_children: false, last_edited_time: '2025-01-01T00:00:00.000Z',
  paragraph: { rich_text: [{ type: 'text', plain_text: content, text: { content, link: null }, annotations: {}, href: null }] },
})

const mention = (id: string, page_id: string) => ({
  object: 'block', id, type: 'paragraph', has_children: false, last_edited_time: '2025-01-01T00:00:00.000Z',
  paragraph: { rich_text: [{ type: 'mention', plain_text: '', mention: { type: 'page', page: { id: page_id } }, annotations: {}, href: null }] },
})

// Run fn with a fresh cache directory and the given settings. Dependencies are
// checked against the API on every call, because the duration is 0.
async function withCache (env: Record<string, string>, fn: (cacheDir: string) => Promise<void>) {
  const cacheDir = await mkdtemp(join(tmpdir(), 'rotion-dependencies-test-'))
  const vars = { ROTION_CACHEDIR: cacheDir, ROTION_CACHE_AVAILABLE_DURATION: '0', ...env }
  const original: Record<string, string | undefined> = {}
  for (const [key, value] of Object.entries(vars)) {
    original[key] = process.env[key]
    process.env[key] = value
  }
  const warn = console.warn
  console.warn = () => {}
  try {
    await fn(cacheDir)
  } finally {
    console.warn = warn
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
    await rm(cacheDir, { recursive: true, force: true })
  }
}

const pageTime = '2026-01-01T00:00:00.000Z'
const paragraphText = (res: FetchBlocksRes, i = 0) => (res.results[i] as any).paragraph.rich_text[0].plain_text as string

test('collectDependencies passes nested dependencies up, without duplicates', async () => {
  const dep = (id: string) => ({ type: 'page' as const, id, last_edited_time: 't' })
  const outer = await collectDependencies(async () => {
    recordDependency(dep('a'))
    const inner = await collectDependencies(async () => {
      recordDependencies([dep('b'), dep('a')])
    })
    assert.equal(inner.dependencies.map(d => d.id), ['b', 'a'])
  })
  assert.equal(outer.dependencies.map(d => d.id).sort(), ['a', 'b'])
})

test('FetchBlocks shows an edit to the source of a synced block, although the page itself was not edited', async () => {
  const { state, restore } = fakeNotion()
  let source = 'before'
  state.pages.source = { title: 'Source', edited: '2026-01-01T00:00:00.000Z' }
  state.parents['original-block'] = 'source'
  state.children.page = () => [{
    object: 'block', id: 'reference', type: 'synced_block', has_children: true, last_edited_time: '2025-01-01T00:00:00.000Z',
    synced_block: { synced_from: { type: 'block_id', block_id: 'original-block' } },
  }]
  state.children['original-block'] = () => [text('source-text', source)]
  const synced = (res: FetchBlocksRes) => paragraphText((res.results[0] as any).children)

  try {
    await withCache({ ROTION_INCREMENTAL_CACHE: 'true' }, async (cacheDir) => {
      assert.equal(synced(await FetchBlocks({ block_id: 'page', last_edited_time: pageTime })), 'before')
      const cache = await readCache<FetchBlocksRes>(`${cacheDir}/notion.blocks.children.list-page`)
      assert.equal(cache.dependencies, [{ type: 'page', id: 'source', last_edited_time: '2026-01-01T00:00:00.000Z' }])

      // Edit the source in its own page
      source = 'after'
      state.pages.source.edited = '2026-02-01T00:00:00.000Z'
      assert.equal(synced(await FetchBlocks({ block_id: 'page', last_edited_time: pageTime })), 'after')
    })
  } finally {
    restore()
  }
})

test('FetchBlocks shows the new title of a mentioned page, also from a nested block', async () => {
  const { state, restore } = fakeNotion()
  state.pages.mentioned = { title: 'Old title', edited: '2026-01-01T00:00:00.000Z' }
  state.children.page = () => [
    mention('top-mention', 'mentioned'),
    { object: 'block', id: 'toggle', type: 'toggle', has_children: true, last_edited_time: '2025-01-01T00:00:00.000Z', toggle: { rich_text: [] } },
  ]
  state.children.toggle = () => [mention('nested-mention', 'mentioned')]
  const names = (res: FetchBlocksRes) => [
    (res.results[0] as any).paragraph.rich_text[0].mention.page.name,
    ((res.results[1] as any).children.results[0]).paragraph.rich_text[0].mention.page.name,
  ]

  try {
    await withCache({ ROTION_INCREMENTAL_CACHE: 'true' }, async () => {
      assert.equal(names(await FetchBlocks({ block_id: 'page', last_edited_time: pageTime })), ['Old title', 'Old title'])

      state.pages.mentioned = { title: 'New title', edited: '2026-02-01T00:00:00.000Z' }
      assert.equal(names(await FetchBlocks({ block_id: 'page', last_edited_time: pageTime })), ['New title', 'New title'])
    })
  } finally {
    restore()
  }
})

test('FetchBlocks reuses the cache when no dependency was edited', async () => {
  const { state, restore } = fakeNotion()
  state.pages.mentioned = { title: 'Title', edited: '2026-01-01T00:00:00.000Z' }
  state.children.page = () => [mention('m', 'mentioned')]

  try {
    await withCache({ ROTION_INCREMENTAL_CACHE: 'true' }, async () => {
      await FetchBlocks({ block_id: 'page', last_edited_time: pageTime })
      state.calls.list = []
      await FetchBlocks({ block_id: 'page', last_edited_time: pageTime })
      assert.equal(state.calls.list, [], 'the blocks should come from the cache')
    })
  } finally {
    restore()
  }
})

test('FetchBlocks does not check dependencies without the incremental cache', async () => {
  const { state, restore } = fakeNotion()
  state.pages.mentioned = { title: 'Old title', edited: '2026-01-01T00:00:00.000Z' }
  state.children.page = () => [mention('m', 'mentioned')]

  try {
    await withCache({ ROTION_INCREMENTAL_CACHE: 'false' }, async () => {
      await FetchBlocks({ block_id: 'page' })
      state.pages.mentioned = { title: 'New title', edited: '2026-02-01T00:00:00.000Z' }
      state.calls = { list: [], pages: [] }
      const res = await FetchBlocks({ block_id: 'page' })
      assert.equal((res.results[0] as any).paragraph.rich_text[0].mention.page.name, 'Old title')
      assert.equal(state.calls, { list: [], pages: [] }, 'the default cache is reused as it is')
    })
  } finally {
    restore()
  }
})

test.run()
