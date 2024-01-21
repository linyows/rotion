import {
  reqAPIWithBackoff,
  reqAPIWithBackoffAndCache,
  notion,
} from './api.js'
import {
  cacheDir,
  incrementalCache,
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
} from './types.js'

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

  try {
    const page = await readCache<GetPageResponseEx>(cacheFile)
    if (!isEmpty(page)) {
      if (incrementalCache && last_edited_time === undefined) {
        console.log('last_edited_time is required as a FetchPage() args when incremental cache')
        return page
      }
      if (!incrementalCache || ('last_edited_time' in page && page.last_edited_time === last_edited_time)) {
        return page
      }
      console.log(`incremental page cache: ${cacheFile}`)
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

  if ('cover' in page && page.cover !== null) {
    if (page.cover.type === 'external') {
      page.cover.src = await saveImage(page.cover.external.url, `page-cover-${page.id}`)
    } else if (page.cover.type === 'file') {
      page.cover.src = await saveImage(page.cover.file.url, `page-cover-${page.id}`)
    }
  }
  if ('icon' in page && page.icon !== null) {
    if (page.icon.type === 'external') {
      page.icon.src = await saveImage(page.icon.external.url, `page-icon-${page.id}`)
    } else if (page.icon.type === 'file') {
      page.icon.src = await saveImage(page.icon.file.url, `page-icon-${page.id}`)
    }
  }

  await writeCache(cacheFile, page)

  return page
}
