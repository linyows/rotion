import { test } from 'uvu'
import * as assert from 'uvu/assert'
import http from 'node:http'
import { mkdtemp, mkdir, rm, writeFile, utimes, readdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pruneCache } from './prune.js'
import { readCache, writeCache } from './files.js'
import { FetchBlocks } from './blocks.js'
import { notion } from './api.js'

const hash = (c: string) => c.repeat(40)
const day = 24 * 60 * 60 * 1000
const old = new Date(Date.now() - 30 * day)

// A fresh cache directory and docroot for each test
async function withDirs (fn: (dirs: { cache: string, images: string, files: string, root: string }) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), 'rotion-prune-test-'))
  const dirs = { root, cache: join(root, 'cache'), images: join(root, 'public', 'images'), files: join(root, 'public', 'files') }
  for (const d of [dirs.cache, dirs.images, dirs.files]) {
    await mkdir(d, { recursive: true })
  }
  // Other test files may leave ROTION_SKIP_DOWNLOAD set; this one downloads
  const original = {
    cache: process.env.ROTION_CACHEDIR,
    docroot: process.env.ROTION_DOCROOT,
    skip: process.env.ROTION_SKIP_DOWNLOAD,
  }
  process.env.ROTION_CACHEDIR = dirs.cache
  process.env.ROTION_DOCROOT = join(root, 'public')
  delete process.env.ROTION_SKIP_DOWNLOAD
  try {
    await fn(dirs)
  } finally {
    for (const [key, value] of [['ROTION_CACHEDIR', original.cache], ['ROTION_DOCROOT', original.docroot], ['ROTION_SKIP_DOWNLOAD', original.skip]] as const) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
    await rm(root, { recursive: true, force: true })
  }
}

// Create a file, last used (atime) and modified (mtime) at the given time
async function file (p: string, used: Date, content = 'x') {
  await writeFile(p, content)
  await utimes(p, used, used)
}

const names = async (dir: string) => (await readdir(dir)).sort()

test('pruneCache removes cache files that were not used since the given time', async () => {
  await withDirs(async ({ cache }) => {
    await file(join(cache, 'notion.blocks.children.list-old'), old)
    await file(join(cache, 'notion.blocks.children.list-new'), new Date())
    await file(join(cache, 'notion.pages.retrieve-old.123.456.abc123.tmp'), old)
    await file(join(cache, 'notes.txt'), old)

    const { removed } = await pruneCache({ before: new Date(Date.now() - day) })
    assert.equal(removed.map(p => p.replace(cache + '/', '')).sort(), [
      'notion.blocks.children.list-old',
      'notion.pages.retrieve-old.123.456.abc123.tmp',
    ])
    assert.equal(await names(cache), ['notes.txt', 'notion.blocks.children.list-new'])
  })
})

test('pruneCache removes a download together with its conversions, only when none of them was used', async () => {
  await withDirs(async ({ images, files }) => {
    // Unused: the original and its WebP
    await file(join(images, `block-a-${hash('a')}.png`), old)
    await file(join(images, `block-a-${hash('a')}.webp`), old)
    // The WebP was used, so the original is kept too
    await file(join(images, `block-b-${hash('b')}.png`), old)
    await file(join(images, `block-b-${hash('b')}.webp`), new Date())
    // Not named by Rotion: an image of the site itself
    await file(join(images, 'logo.png'), old)
    await file(join(files, `block-c-${hash('c')}.pdf`), old)

    const { removed } = await pruneCache({ before: new Date(Date.now() - day) })
    assert.equal(removed.length, 3)
    assert.equal(await names(images), [`block-b-${hash('b')}.png`, `block-b-${hash('b')}.webp`, 'logo.png'])
    assert.equal(await names(files), [])
  })
})

test('pruneCache with dryRun lists the files without removing them', async () => {
  await withDirs(async ({ cache }) => {
    await file(join(cache, 'notion.blocks.children.list-old'), old)
    const { removed } = await pruneCache({ before: new Date(), dryRun: true })
    assert.equal(removed, [join(cache, 'notion.blocks.children.list-old')])
    assert.equal(await names(cache), ['notion.blocks.children.list-old'])
  })
})

test('readCache marks the cache file and the downloads it refers to as used', async () => {
  await withDirs(async ({ cache, images }) => {
    const cacheFile = join(cache, `notion.blocks.children.list-read-${Date.now()}`)
    const webp = `block-d-${hash('d')}.webp`
    await writeCache(cacheFile, { results: [{ image: { src: `/images/${webp}` } }] })
    await utimes(cacheFile, old, old)
    await file(join(images, webp), old)
    await file(join(images, `block-d-${hash('d')}.png`), old)

    const before = new Date(Date.now() - 1000)
    await readCache(cacheFile)
    const { removed } = await pruneCache({ before })
    assert.equal(removed, [])
  })
})

test('pruneCache keeps the image of a page that is served from the cache', async () => {
  const sharp = (await import('sharp')).default
  const png = await sharp({ create: { width: 2, height: 2, channels: 3, background: { r: 0, g: 0, b: 0 } } }).png().toBuffer()
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.end(png)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = (server.address() as { port: number }).port
  const client = notion()
  const list = client.blocks.children.list
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  client.blocks.children.list = (async () => ({
    object: 'list', next_cursor: null, has_more: false,
    results: [{
      object: 'block', id: `served-image-${suffix}`, type: 'image', has_children: false, last_edited_time: '2025-01-01T00:00:00.000Z',
      image: { type: 'external', external: { url: `http://127.0.0.1:${port}/photo-${suffix}.png` } },
    }],
  })) as never

  try {
    await withDirs(async ({ cache, images }) => {
      await FetchBlocks({ block_id: `served-page-${suffix}` })
      // Everything was last used long ago, and an unrelated download is left over
      for (const dir of [cache, images]) {
        for (const name of await readdir(dir)) {
          await utimes(join(dir, name), old, old).catch(() => {})
        }
      }
      await file(join(images, `block-gone-${hash('e')}.webp`), old)

      // A later build serves the page from the cache
      const buildStarted = new Date(Date.now() - 1000)
      const res = await FetchBlocks({ block_id: `served-page-${suffix}` })
      const { removed } = await pruneCache({ before: buildStarted })

      assert.equal(removed, [join(images, `block-gone-${hash('e')}.webp`)])
      const src = (res.results[0] as any).image.src as string
      assert.ok((await names(images)).includes(src.replace('/images/', '')), `${src} must be kept`)
    })
  } finally {
    client.blocks.children.list = list
    await new Promise<void>(resolve => server.close(() => resolve()))
  }
})

test.run()
