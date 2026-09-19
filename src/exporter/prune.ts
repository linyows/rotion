import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import { config } from './variables.js'

export interface PruneCacheArgs {
  /** Remove what has not been used since this time */
  before: Date
  /** List what would be removed without removing it */
  dryRun?: boolean
}

export interface PruneCacheRes {
  /** Paths of the files removed, or that would be removed with dryRun */
  removed: string[]
}

// A downloaded file is named <prefix>-<sha1 of the name in its URL><ext>,
// and its conversions (.webp, .png) share the name without the extension.
const downloadedName = /^(.+-[0-9a-f]{40})(\.[^.]+)?$/i
// Files a write left behind when it failed: <path>.<pid>.<time>.<random>.tmp
const temporaryName = /\.\d+\.\d+\.[0-9a-z]+\.tmp$/

async function listFiles (dir: string): Promise<{ name: string, file: string, atime: number, mtime: number }[]> {
  let names: string[]
  try {
    names = await readdir(dir)
  } catch {
    return []
  }
  const files = []
  for (const name of names) {
    const file = path.join(dir, name)
    try {
      const s = await stat(file)
      if (s.isFile()) {
        files.push({ name, file, atime: s.atimeMs, mtime: s.mtimeMs })
      }
    } catch {
      // Removed in the meantime
    }
  }
  return files
}

/**
 * pruneCache removes cache files, downloaded images and downloaded files that
 * Rotion has not used since `before`. Rotion marks what it uses by setting
 * the access time: a cache file when it is read or written, a download when
 * it is saved or found, and the downloads a cached result refers to when that
 * result is read.
 *
 * Only files named the way Rotion names them are removed: cache files that
 * start with "notion.", and downloads whose name ends with a hash. Other
 * files in the same directories, such as images of the site itself, are
 * kept. A download and its conversions (the WebP of an image, the PNG of a
 * HEIC) are removed together, and only when none of them was used.
 *
 * Run it after a full build with the time the build started, or on a server
 * with a period longer than any page is kept without asking Rotion again.
 */
export async function pruneCache ({ before, dryRun = false }: PruneCacheArgs): Promise<PruneCacheRes> {
  const { cacheDir, docRoot, imageDir, fileDir } = config()
  const limit = before.getTime()
  const removed: string[] = []

  for (const f of await listFiles(cacheDir)) {
    const unused = f.name.startsWith('notion.') && !temporaryName.test(f.name) && f.atime < limit
    const leftover = temporaryName.test(f.name) && f.mtime < limit
    if (unused || leftover) {
      removed.push(f.file)
    }
  }

  for (const dir of [path.join(docRoot, imageDir), path.join(docRoot, fileDir)]) {
    const groups = new Map<string, { files: string[], used: number }>()
    for (const f of await listFiles(dir)) {
      if (temporaryName.test(f.name)) {
        if (f.mtime < limit) {
          removed.push(f.file)
        }
        continue
      }
      const m = f.name.match(downloadedName)
      if (m === null) {
        continue
      }
      const group = groups.get(m[1]) ?? { files: [], used: 0 }
      group.files.push(f.file)
      group.used = Math.max(group.used, f.atime)
      groups.set(m[1], group)
    }
    for (const group of groups.values()) {
      if (group.used < limit) {
        removed.push(...group.files)
      }
    }
  }

  if (!dryRun) {
    for (const file of removed) {
      try {
        await unlink(file)
      } catch {
        // Removed in the meantime
      }
    }
  }

  return { removed }
}
