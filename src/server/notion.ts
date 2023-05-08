import { Client, isNotionClientError, APIErrorCode } from '@notionhq/client'
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponseEx,
  ListBlockChildrenResponseEx,
  GetPageResponseEx,
  GetDatabaseResponseEx,
  PropertyItemPropertyItemListResponse,
  PageObjectResponseEx,
  PersonUserObjectResponseEx,
  GetPagePropertyResponse,
} from './types'
import {
  atoh,
  createDirWhenNotfound,
  saveImage,
  readCache,
  writeCache,
  getHtmlMeta,
  getVideoHtml,
  getEmbedHtml,
  isAvailableCache,
} from './files'

const cacheDir = process.env.NOTIONATE_CACHEDIR || '.cache'
const incrementalCache = process.env.NOTIONATE_INCREMENTAL_CACHE === 'true'
const auth = process.env.NOTION_TOKEN
const notion = new Client({ auth })
const waitingTimeSec = 1 * 1000
const waitTimeSecAfterLimit = 60 * 1000

const isEmpty = (obj: Object) => {
  return !Object.keys(obj).length
}

const queryDbWithBackoff = async (params: QueryDatabaseParameters): Promise<QueryDatabaseResponseEx> => {
  let db: QueryDatabaseResponseEx|null = null
  try {
    db = await notion.databases.query(params) as QueryDatabaseResponseEx
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.RateLimited:
        case APIErrorCode.InternalServerError:
          console.log(`Backoff -- api error code: ${error.code}`)
          await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
          db = await notion.databases.query(params) as QueryDatabaseResponseEx
          break
      }
    }
    console.error(error)
  }
  if (db === null) {
    throw new Error('notion.databases.query: request to notion api failed')
  }
  return db
}

const getDbWithBackoff = async (database_id: string): Promise<GetDatabaseResponseEx> => {
  let db: GetDatabaseResponseEx|null = null
  try {
    db = await notion.databases.retrieve({ database_id }) as GetDatabaseResponseEx
    await new Promise(resolve => setTimeout(resolve, waitingTimeSec))
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.RateLimited:
        case APIErrorCode.InternalServerError:
          console.log(`Backoff -- api error code: ${error.code}`)
          await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
          db = await notion.databases.retrieve({ database_id }) as GetDatabaseResponseEx
          break
      }
    }
    console.error(error)
  }
  if (db === null) {
    throw new Error('notion.databases.retrieve: request to notion api failed')
  }
  return db
}

const getPageWithBackoff = async (page_id: string): Promise<GetPageResponseEx> => {
  let page: GetPageResponseEx|null = null
  try {
    page = await notion.pages.retrieve({ page_id }) as GetPageResponseEx
    await new Promise(resolve => setTimeout(resolve, waitingTimeSec))
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.RateLimited:
        case APIErrorCode.InternalServerError:
          console.log(`Backoff -- api error code: ${error.code}`)
          await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
          page = await notion.pages.retrieve({ page_id }) as GetPageResponseEx
          break
      }
    }
    console.error(error)
  }
  if (page === null) {
    throw new Error('notion.pages.retrieve: request to notion api failed')
  }
  return page
}

const getListBlockWithBackoff = async (block_id: string): Promise<ListBlockChildrenResponseEx> => {
  let list: ListBlockChildrenResponseEx|null = null
  try {
    list = await notion.blocks.children.list({ block_id }) as ListBlockChildrenResponseEx
    await new Promise(resolve => setTimeout(resolve, waitingTimeSec))
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.RateLimited:
        case APIErrorCode.InternalServerError:
          console.log(`Backoff -- api error code: ${error.code}`)
          await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
          list = await notion.blocks.children.list({ block_id }) as ListBlockChildrenResponseEx
          break
      }
    }
    console.error(error)
  }
  if (list === null) {
    throw new Error('notion.blocks.children.list: request to notion api failed')
  }
  return list
}

const getPagePropertyWithBackoff = async (page_id: string, property_id: string): Promise<GetPagePropertyResponse> => {
  let props: GetPagePropertyResponse|null = null
  try {
    props = await notion.pages.properties.retrieve({ page_id, property_id })
    await new Promise(resolve => setTimeout(resolve, waitingTimeSec))
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.RateLimited:
        case APIErrorCode.InternalServerError:
          await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
          props = await notion.pages.properties.retrieve({ page_id, property_id })
          break
      }
    }
    console.error(error)
  }
  if (props === null) {
    throw new Error('notion.pages.properties.retrieve: request to notion api failed')
  }
  return props
}

/**
 * FetchDatabase retrieves database and download images in from blocks.
 * And create cache that includes filepath of downloaded images.
 */
export const FetchDatabase = async (params: QueryDatabaseParameters): Promise<QueryDatabaseResponseEx> => {
  const { database_id } = params
  const limit = ('page_size' in params) ? params.page_size : undefined
  const paramsHash = atoh(JSON.stringify(params))

  await createDirWhenNotfound(cacheDir)
  const cacheFile = `${cacheDir}/notion.databases.query-${paramsHash}${limit !== undefined ? `.limit-${limit}` : ''}`
  let allres: undefined|QueryDatabaseResponseEx
  let res: undefined|QueryDatabaseResponseEx

  try {
    const list = await readCache<QueryDatabaseResponseEx>(cacheFile)
    if (!isEmpty(list)) {
      if (!incrementalCache) {
        return list
      }
      if (await isAvailableCache(cacheFile, 120)) {
        return list
      }
    }
  } catch (_) {
    /* not fatal */
  }

  while (true) {
    if (res && res.next_cursor) {
      params.start_cursor = res.next_cursor
    }
    res = await queryDbWithBackoff(params)
    if (allres === undefined) {
      allres = res
    } else {
      allres.results.push(...res.results)
    }
    if (res.next_cursor === null || limit !== undefined) {
      break
    }
  }

  for (const result of allres.results) {
    const page: PageObjectResponseEx = result
    // Save page cover files
    if ('cover' in page && page.cover != null) {
      const imageUrl = (page.cover.type === 'external') ? page.cover.external.url : page.cover.file.url
      page.cover.src = await saveImage(imageUrl, `page-cover-${page.id}`)
    }
    // Set page property items
    page.property_items = []
    for (const [, v] of Object.entries(page.properties)) {
      const page_id = page.id
      const property_id = v.id
      const props = await getPagePropertyWithBackoff(page_id, property_id)
      page.property_items.push(props)
      // Save avatar in people property type
      if (v.type === 'people') {
        const peoples = v.people as unknown as PersonUserObjectResponseEx[]
        for (const people of peoples) {
          if (people.avatar_url) {
            people.avatar = await saveImage(people.avatar_url, `database-avatar-${people.id}`)
          }
        }
      }
    }
  }

  const meta = await getDbWithBackoff(database_id)
  if ('cover' in meta && meta.cover !== null) {
    const imageUrl = (meta.cover.type === 'external') ? meta.cover.external.url : meta.cover.file.url
    meta.cover.src = await saveImage(imageUrl, `database-cover-${database_id}`)
  }
  allres.meta = meta

  await writeCache(cacheFile, allres)

  return allres
}

/**
 * FetchPage retrieves page properties and download images in from properties.
 * And create cache that includes filepath of downloaded images.
 * The last_edited_time of 2nd args is for NOTIONATE_INCREMENTAL_CACHE.
 */
export const FetchPage = async (page_id: string, last_edited_time?: string): Promise<GetPageResponseEx> => {
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

  const page = await getPageWithBackoff(page_id)

  if ('properties' in page) {
    let list: undefined|PropertyItemPropertyItemListResponse
    for (const [, v] of Object.entries(page.properties)) {
      const property_id = v.id
      const res = await getPagePropertyWithBackoff(page_id, property_id)
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
  if ('icon' in page && page.icon?.type === 'file') {
    page.icon.src = await saveImage(page.icon.file.url, `page-icon-${page.id}`)
  }

  await writeCache(cacheFile, page)

  return page
}

/**
 * FetchBlocks retrieves page blocks and download images in from blocks.
 * And create cache that includes filepath of downloaded images.
 * The last_edited_time of 2nd args is for NOTIONATE_INCREMENTAL_CACHE.
 */
export const FetchBlocks = async (block_id: string, last_edited_time?: string): Promise<ListBlockChildrenResponseEx> => {
  await createDirWhenNotfound(cacheDir)
  const cacheFile = `${cacheDir}/notion.blocks.children.list-${block_id}`

  try {
    const list = await readCache<ListBlockChildrenResponseEx>(cacheFile)
    if (!isEmpty(list)) {
      if (incrementalCache && last_edited_time === undefined) {
        console.log('last_edited_time is required as a FetchBlocks() args when incremental cache')
        return list
      }
      if (!incrementalCache || list.last_edited_time === last_edited_time) {
        return list
      }
      console.log(`incremental block cache: ${cacheFile}`)
    }
  } catch (_) {
    /* not fatal */
  }

  const list = await getListBlockWithBackoff(block_id)

  // With the blocks api, you can get the last modified date of a block,
  // but not the last modified date of all blocks. So extend the type and add it.
  if (last_edited_time) {
    list.last_edited_time = last_edited_time
  }

  for (const block of list.results) {
    try {
      if (block.type === 'table' && block.table !== undefined) {
        block.children = await FetchBlocks(block.id, block.last_edited_time)
      } else if (block.type === 'toggle' && block.toggle !== undefined) {
        block.children = await FetchBlocks(block.id, block.last_edited_time)
      } else if (block.type === 'column_list' && block.column_list !== undefined) {
        block.children = await FetchBlocks(block.id, block.last_edited_time)
        block.columns = []
        for (const b of block.children.results) {
          block.columns.push(await FetchBlocks(b.id, block.last_edited_time))
        }
      } else if (block.type === 'child_page' && block.child_page !== undefined) {
        block.page = await FetchPage(block.id, block.last_edited_time)
        block.children = await FetchBlocks(block.id, block.last_edited_time)
      } else if (block.type === 'child_database' && block.child_database !== undefined && block.has_children) {
        const database_id = block.id
        block.database = await getDbWithBackoff(database_id)
      } else if (block.type === 'bookmark' && block.bookmark !== undefined) {
        block.bookmark.site = await getHtmlMeta(block.bookmark.url)
      } else if (block.type === 'image' && block.image !== undefined) {
        const { id, image } = block
        if (image !== undefined) {
          const imageUrl = image.type === 'file' ? image.file.url : image.external.url
          block.image.src = await saveImage(imageUrl, `block-${id}`)
        }
      } else if (block.type === 'video' && block.video !== undefined && block.video.type === 'external') {
        block.video.html = await getVideoHtml(block)
      } else if (block.type === 'embed' && block.embed !== undefined) {
        block.embed.html = await getEmbedHtml(block)
      }
    } catch (e) {
      console.log(`error for ${block.type} contents get`, block, e)
    }
  }

  await writeCache(cacheFile, list)

  return list
}
