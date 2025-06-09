import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import type { GetDatabaseResponseEx } from './types.js'
import { saveDatabaseCover, saveDatabaseIcon } from './database.js'

test.before(() => {
  td.replace(console, 'log')
  td.reset()
})

test('saveDatabaseCover saves external cover image when cover exists', async () => {
  const mockDatabase = {
    id: 'test-db-id',
    cover: {
      type: 'external',
      external: {
        url: 'https://example.com/cover.jpg'
      },
      src: undefined
    }
  } as unknown as GetDatabaseResponseEx

  await saveDatabaseCover(mockDatabase)

  // Check that the src property was set with the correct pattern
  assert.ok(mockDatabase.cover?.src !== undefined)
  assert.ok(mockDatabase.cover?.src.includes('/images/database-cover-test-db-id'))
  assert.ok(mockDatabase.cover?.src.includes('.jpg'))
})

test('saveDatabaseCover handles null cover gracefully', async () => {
  const mockDatabase = {
    id: 'test-db-id',
    cover: null
  } as GetDatabaseResponseEx

  await saveDatabaseCover(mockDatabase)

  // Should not set src property when cover is null
  assert.equal(mockDatabase.cover, null)
})

test('saveDatabaseCover handles undefined cover gracefully', async () => {
  const mockDatabase = {
    id: 'test-db-id',
    cover: undefined
  } as unknown as GetDatabaseResponseEx

  await saveDatabaseCover(mockDatabase)

  // Should not set src property when cover is undefined
  assert.equal(mockDatabase.cover, undefined)
})

test('saveDatabaseIcon saves external icon image when icon exists', async () => {
  const mockDatabase = {
    id: 'test-db-id',
    icon: {
      type: 'external',
      external: {
        url: 'https://example.com/icon.png'
      },
      src: undefined
    }
  } as unknown as GetDatabaseResponseEx

  await saveDatabaseIcon(mockDatabase)

  // Check that the src property was set with the correct pattern
  assert.ok((mockDatabase.icon as any)?.src !== undefined)
  assert.ok((mockDatabase.icon as any)?.src.includes('/images/database-icon-test-db-id'))
  assert.ok((mockDatabase.icon as any)?.src.includes('.png'))
})

test('saveDatabaseIcon handles file type icon', async () => {
  const mockDatabase = {
    id: 'test-db-id',
    icon: {
      type: 'file',
      file: {
        url: 'https://notion.so/signed-url/icon.png'
      },
      src: undefined
    }
  } as unknown as GetDatabaseResponseEx

  await saveDatabaseIcon(mockDatabase)

  // Check that the src property was set with the correct pattern
  assert.ok((mockDatabase.icon as any)?.src !== undefined)
  assert.ok((mockDatabase.icon as any)?.src.includes('/images/database-icon-test-db-id'))
  assert.ok((mockDatabase.icon as any)?.src.includes('.png'))
})

test('saveDatabaseIcon handles null icon gracefully', async () => {
  const mockDatabase = {
    id: 'test-db-id',
    icon: null
  } as GetDatabaseResponseEx

  await saveDatabaseIcon(mockDatabase)

  // Should not set src property when icon is null
  assert.equal(mockDatabase.icon, null)
})

test('saveDatabaseIcon handles undefined icon gracefully', async () => {
  const mockDatabase = {
    id: 'test-db-id',
    icon: undefined
  } as unknown as GetDatabaseResponseEx

  await saveDatabaseIcon(mockDatabase)

  // Should not set src property when icon is undefined
  assert.equal(mockDatabase.icon, undefined)
}) 

test.run() 