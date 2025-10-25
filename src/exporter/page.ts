import {
  reqAPIWithBackoff,
  reqAPIWithBackoffAndCache,
  notion,
} from './api.js'
import {
  cacheDir,
  incrementalCache,
  debug,
} from './variables.js'
import {
  createDirWhenNotfound,
  saveImage,
  readCache,
  writeCache,
  isEmpty,
} from './files.js'
import type {
  GetPageResponseEx,
  PropertyItemPropertyItemListResponse,
  GetPagePropertyResponse,
  PageObjectResponseEx,
} from './types.js'
import { withFileLock } from './mutex.js'

export interface FetchPageArgs {
  page_id: string
  last_edited_time?: string
}

export interface FetchPageRes extends GetPageResponseEx {
}

/**
 * FetchPage retrieves page properties and download images in from properties.
 * And create cache that includes filepath of downloaded images.
 * The last_edited_time of 2nd args is for ROTION_INCREMENTAL_CACHE.
 */
export const FetchPage = async ({ page_id, last_edited_time }: FetchPageArgs): Promise<FetchPageRes> => {
  await createDirWhenNotfound(cacheDir)
  const cacheFile = `${cacheDir}/notion.pages.retrieve-${page_id}`
  const lockKey = `page-${page_id}`

  return withFileLock(lockKey, async () => {
    try {
      const page = await readCache<GetPageResponseEx>(cacheFile)
      if (!isEmpty(page)) {
        if (incrementalCache && last_edited_time === undefined) {
          if (debug) {
            console.log(`use cache in FetchPage(): ${cacheFile}, last_edited_time is required as a FetchPage() args when incremental cache`)
          }
          return page
        }
        if (!incrementalCache || ('last_edited_time' in page && page.last_edited_time === last_edited_time)) {
          if (debug) {
            console.log(`use cache so same last-edited-time in FetchPage(): ${cacheFile}`)
          }
          return page
        }
        if (debug) {
          console.log(`requesting to API because an old cache file was found in FetchPage(): ${cacheFile}`)
        }
      }
    } catch (_) {
      /* not fatal */
    }

    const page = await reqAPIWithBackoff<GetPageResponseEx>({
      func: notion.pages.retrieve,
      args: { page_id },
      count: 3
    })

    if ('properties' in page) {
      let list: undefined|PropertyItemPropertyItemListResponse
      for (const [, v] of Object.entries(page.properties)) {
        const property_id = v.id
        const res = await reqAPIWithBackoffAndCache<GetPagePropertyResponse>({
          name: 'notion.pages.properties.retrieve',
          func: notion.pages.properties.retrieve,
          args: { page_id, property_id },
          count: 3,
        })
        if (res.object !== 'list') {
          continue
        }
        if (list === undefined) {
          list = res
        } else {
          list.results.push(...res.results)
        }
      }
      page.meta = list
    }

    await savePageCover(page)
    await savePageIcon(page)
    await writeCache(cacheFile, page)

    return page
  })
}

export async function savePageCover(page: GetPageResponseEx | PageObjectResponseEx) {
  if (page.cover === undefined || page.cover === null) {
    return
  }
  try {
    if (page.cover.type === 'external') {
      const ipws = await saveImage(page.cover.external.url, `page-cover-${page.id}`)
      page.cover.src = ipws.path
    } else if (page.cover.type === 'file') {
      const ipws = await saveImage(page.cover.file.url, `page-cover-${page.id}`)
      page.cover.src = ipws.path
    }
  } catch (e) {
    if (debug) {
      console.log(`Failed to save page cover: ${e}`)
    }
  }
}

export async function savePageIcon(page: GetPageResponseEx | PageObjectResponseEx) {
  if (page.icon === undefined || page.icon === null) {
    return
  }
  try {
    if (page.icon.type === 'external') {
      const ipws = await saveImage(page.icon.external.url, `page-icon-${page.id}`)
      page.icon.src = ipws.path
    } else if (page.icon.type === 'file') {
      const ipws = await saveImage(page.icon.file.url, `page-icon-${page.id}`)
      page.icon.src = ipws.path
    }
  } catch (e) {
    if (debug) {
      console.log(`Failed to save page icon: ${e}`)
    }
  }
}
