import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import type { GetPageResponseEx, PageObjectResponseEx } from './types.js'
import { savePageCover, savePageIcon, getNotionIconUrl, FetchPage } from './page.js'
import { notion } from './api.js'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

test.before(() => {
  td.replace(console, 'log')
  td.reset()
  // Enable skipDownload for testing
  process.env.ROTION_SKIP_DOWNLOAD = 'true'
})

test('savePageCover saves external cover image when cover exists', async () => {
  const mockPage = {
    id: 'test-page-id',
    cover: {
      type: 'external',
      external: {
        url: 'https://example.com/page-cover.jpg'
      },
      src: undefined
    }
  } as unknown as GetPageResponseEx

  await savePageCover(mockPage)

  // Check that the src property was set with the correct pattern
  assert.ok(mockPage.cover?.src !== undefined)
  assert.ok(mockPage.cover?.src.includes('/images/page-cover-test-page-id'))
  assert.ok(mockPage.cover?.src.includes('.jpg'))
})

test('savePageCover saves file type cover image when cover exists', async () => {
  const mockPage = {
    id: 'test-page-id',
    cover: {
      type: 'file',
      file: {
        url: 'https://notion.so/signed-url/page-cover.png'
      },
      src: undefined
    }
  } as unknown as GetPageResponseEx

  await savePageCover(mockPage)

  // Check that the src property was set with the correct pattern
  assert.ok(mockPage.cover?.src !== undefined)
  assert.ok(mockPage.cover?.src.includes('/images/page-cover-test-page-id'))
  assert.ok(mockPage.cover?.src.includes('.png'))
})

test('savePageCover handles null cover gracefully', async () => {
  const mockPage = {
    id: 'test-page-id',
    cover: null
  } as GetPageResponseEx

  await savePageCover(mockPage)

  // Should not set src property when cover is null
  assert.equal(mockPage.cover, null)
})

test('savePageCover handles undefined cover gracefully', async () => {
  const mockPage = {
    id: 'test-page-id',
    cover: undefined
  } as unknown as GetPageResponseEx

  await savePageCover(mockPage)

  // Should not set src property when cover is undefined
  assert.equal(mockPage.cover, undefined)
})

test('savePageIcon saves external icon image when icon exists', async () => {
  const mockPage = {
    id: 'test-page-id',
    icon: {
      type: 'external',
      external: {
        url: 'https://example.com/page-icon.png'
      },
      src: undefined
    }
  } as unknown as GetPageResponseEx

  await savePageIcon(mockPage)

  // Check that the src property was set with the correct pattern
  assert.ok((mockPage.icon as any)?.src !== undefined)
  assert.ok((mockPage.icon as any)?.src.includes('/images/page-icon-test-page-id'))
  assert.ok((mockPage.icon as any)?.src.includes('.png'))
})

test('savePageIcon saves file type icon image when icon exists', async () => {
  const mockPage = {
    id: 'test-page-id',
    icon: {
      type: 'file',
      file: {
        url: 'https://notion.so/signed-url/page-icon.svg'
      },
      src: undefined
    }
  } as unknown as GetPageResponseEx

  await savePageIcon(mockPage)

  // Check that the src property was set with the correct pattern
  assert.ok((mockPage.icon as any)?.src !== undefined)
  assert.ok((mockPage.icon as any)?.src.includes('/images/page-icon-test-page-id'))
  assert.ok((mockPage.icon as any)?.src.includes('.svg'))
})

test('savePageIcon handles null icon gracefully', async () => {
  const mockPage = {
    id: 'test-page-id',
    icon: null
  } as GetPageResponseEx

  await savePageIcon(mockPage)

  // Should not set src property when icon is null
  assert.equal(mockPage.icon, null)
})

test('savePageIcon handles undefined icon gracefully', async () => {
  const mockPage = {
    id: 'test-page-id',
    icon: undefined
  } as unknown as GetPageResponseEx

  await savePageIcon(mockPage)

  // Should not set src property when icon is undefined
  assert.equal(mockPage.icon, undefined)
})

test('savePageCover works with PageObjectResponseEx type', async () => {
  const mockPage = {
    id: 'test-page-id',
    cover: {
      type: 'external',
      external: {
        url: 'https://example.com/page-object-cover.jpg'
      },
      src: undefined
    }
  } as unknown as PageObjectResponseEx

  await savePageCover(mockPage)

  // Check that the src property was set with the correct pattern
  assert.ok(mockPage.cover?.src !== undefined)
  assert.ok(mockPage.cover?.src.includes('/images/page-cover-test-page-id'))
  assert.ok(mockPage.cover?.src.includes('.jpg'))
})

test('savePageIcon works with PageObjectResponseEx type', async () => {
  const mockPage = {
    id: 'test-page-id',
    icon: {
      type: 'external',
      external: {
        url: 'https://example.com/page-object-icon.png'
      },
      src: undefined
    }
  } as unknown as PageObjectResponseEx

  await savePageIcon(mockPage)

  // Check that the src property was set with the correct pattern
  assert.ok((mockPage.icon as any)?.src !== undefined)
  assert.ok((mockPage.icon as any)?.src.includes('/images/page-icon-test-page-id'))
  assert.ok((mockPage.icon as any)?.src.includes('.png'))
})

test('getNotionIconUrl builds correct URL from icon name and color', () => {
  const url = getNotionIconUrl({ name: 'bookmark-outline', color: 'blue' })
  assert.equal(url, 'https://www.notion.so/icons/bookmark-outline_blue.svg')
})

test('getNotionIconUrl handles various icon names and colors', () => {
  const cases = [
    { icon: { name: 'light-bulb', color: 'gray' }, expected: 'https://www.notion.so/icons/light-bulb_gray.svg' },
    { icon: { name: 'circle', color: 'red' }, expected: 'https://www.notion.so/icons/circle_red.svg' },
    { icon: { name: 'bread', color: 'blue' }, expected: 'https://www.notion.so/icons/bread_blue.svg' },
  ]
  for (const { icon, expected } of cases) {
    assert.equal(getNotionIconUrl(icon), expected)
  }
})

test('savePageIcon saves notion icon type and converts to external', async () => {
  const mockPage = {
    id: 'test-page-id',
    icon: {
      type: 'icon',
      icon: {
        name: 'bookmark-outline',
        color: 'blue',
      },
    }
  } as unknown as GetPageResponseEx

  await savePageIcon(mockPage)

  // Should convert icon type to external with src set
  const icon = mockPage.icon as any
  assert.equal(icon.type, 'external')
  assert.ok(icon.src !== undefined)
  assert.ok(icon.src.includes('/images/page-icon-test-page-id'))
  assert.ok(icon.src.includes('.svg'))
  assert.equal(icon.external.url, 'https://www.notion.so/icons/bookmark-outline_blue.svg')
})

test('savePageIcon saves notion icon type with PageObjectResponseEx', async () => {
  const mockPage = {
    id: 'test-page-id',
    icon: {
      type: 'icon',
      icon: {
        name: 'circle',
        color: 'red',
      },
    }
  } as unknown as PageObjectResponseEx

  await savePageIcon(mockPage)

  const icon = mockPage.icon as any
  assert.equal(icon.type, 'external')
  assert.ok(icon.src.includes('/images/page-icon-test-page-id'))
  assert.equal(icon.external.url, 'https://www.notion.so/icons/circle_red.svg')
})

test('FetchPage asks only for the properties that answer with a list, and page.meta keeps them', async () => {
  const types = ['title', 'rich_text', 'people', 'relation', 'rollup', 'number', 'select', 'multi_select', 'date', 'checkbox', 'url', 'formula', 'status']
  const properties = Object.fromEntries(types.map(type => [`${type} property`, { id: `id-${type}`, type, [type]: {} }]))
  const listTypes = ['title', 'rich_text', 'people', 'relation', 'rollup']
  const client = notion()
  const original = { page: client.pages.retrieve, property: client.pages.properties.retrieve }
  const asked: string[] = []
  client.pages.retrieve = (async ({ page_id }: { page_id: string }) => ({
    object: 'page', id: page_id, last_edited_time: '2026-01-01T00:00:00.000Z', cover: null, icon: null, properties,
  })) as never
  client.pages.properties.retrieve = (async ({ property_id }: { property_id: string }) => {
    const type = property_id.replace('id-', '')
    asked.push(type)
    // The API answers these types with a list, and any other with a single item
    return listTypes.includes(type)
      ? { object: 'list', type: 'property_item', results: [{ object: 'property_item', id: property_id, type }], next_cursor: null, has_more: false }
      : { object: 'property_item', id: property_id, type }
  }) as never
  const cacheDir = await mkdtemp(join(tmpdir(), 'rotion-page-test-'))
  const originalCacheDir = process.env.ROTION_CACHEDIR
  process.env.ROTION_CACHEDIR = cacheDir

  try {
    const page = await FetchPage({ page_id: `properties-${Date.now()}` })
    assert.equal(asked.sort(), [...listTypes].sort())
    assert.equal(page.meta?.object, 'list')
    assert.equal((page.meta?.results ?? []).map((r: { type: string }) => r.type), listTypes)
  } finally {
    client.pages.retrieve = original.page
    client.pages.properties.retrieve = original.property
    if (originalCacheDir === undefined) {
      delete process.env.ROTION_CACHEDIR
    } else {
      process.env.ROTION_CACHEDIR = originalCacheDir
    }
    await rm(cacheDir, { recursive: true, force: true })
  }
})

test.run()
