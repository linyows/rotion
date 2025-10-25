import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import type { GetPageResponseEx, PageObjectResponseEx } from './types.js'
import { savePageCover, savePageIcon } from './page.js'

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

test.run() 