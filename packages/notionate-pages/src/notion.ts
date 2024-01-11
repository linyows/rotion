import {
  Client,
  isNotionClientError,
  APIErrorCode,
  ClientErrorCode,
} from '@notionhq/client'
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
} from './types.js'
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
} from './files.js'

const cacheDir = process.env.NOTIONATE_CACHEDIR || '.cache'
const incrementalCache = process.env.NOTIONATE_INCREMENTAL_CACHE === 'true'
const waitingTimeSec = (process.env.NOTIONATE_WAITTIME || 0) as number
const waitTimeSecAfterLimit = (process.env.NOTIONATE_LIMITED_WAITTIME || 60 * 1000) as number
const auth = process.env.NOTION_TOKEN
const notion = new Client({ auth })

const isEmpty = (obj: Object) => {
  return !Object.keys(obj).length
}

async function reqAPIWithBackoff<T> (func: Function, args: unknown, count: number): Promise<T> {
  if (count < 1) {
    throw new Error('backoff count exceeded')
  }

  let res: T|null = null

  try {
    res = await func(args) as T
    if (waitingTimeSec > 0) {
      await new Promise(resolve => setTimeout(resolve, waitingTimeSec))
    }
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.RateLimited:
        case APIErrorCode.InternalServerError:
        case ClientErrorCode.ResponseError:
        case ClientErrorCode.RequestTimeout:
          console.log(`backoff(${count}) -- error code: ${error.code}`)
          if (waitTimeSecAfterLimit > 0) {
            await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
          }
          res = await reqAPIWithBackoff<T>(func, args, count--)
          break
      }
    }
    console.error('error:', error)
    console.error('args:', args)
  }

  if (res === null) {
    throw new Error(`request to notion api failed: ${func.name}`)
  }

  return res
}

async function reqAPIWithBackoffAndCache<T> (name: string, func: Function, args: unknown, count: number): Promise<T> {
  const key = atoh(JSON.stringify({ func: func.name, args }))
  const cacheFile = `${cacheDir}/${name}-${key}`

  try {
    const cache = await readCache<T|null>(cacheFile)
    if (await isAvailableCache(cacheFile, 600)) {
      return cache as T
    }
  } catch (_) {
    /* not fatal */
  }

  const res = await reqAPIWithBackoff<T>(func, args, count)
  await writeCache(cacheFile, res)
  return res as T
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
    res = await reqAPIWithBackoff<QueryDatabaseResponseEx>(notion.databases.query, params, 3)
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
      const props = await reqAPIWithBackoffAndCache<GetPagePropertyResponse>('notion.pages.properties.retrieve', notion.pages.properties.retrieve, { page_id, property_id }, 3)
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

  const meta = await reqAPIWithBackoff<GetDatabaseResponseEx>(notion.databases.retrieve, { database_id }, 3)
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

  const page = await reqAPIWithBackoff<GetPageResponseEx>(notion.pages.retrieve, { page_id }, 3)

  if ('properties' in page) {
    let list: undefined|PropertyItemPropertyItemListResponse
    for (const [, v] of Object.entries(page.properties)) {
      const property_id = v.id
      const res = await reqAPIWithBackoffAndCache<GetPagePropertyResponse>('notion.pages.properties.retrieve', notion.pages.properties.retrieve, { page_id, property_id }, 3)
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

  const list = await reqAPIWithBackoff<ListBlockChildrenResponseEx>(notion.blocks.children.list, { block_id }, 3)

  // With the blocks api, you can get the last modified date of a block,
  // but not the last modified date of all blocks. So extend the type and add it.
  if (last_edited_time) {
    list.last_edited_time = last_edited_time
  }

  for (const block of list.results) {
    try {
      const { type } = block
      switch (type) {
        case 'bookmark':
          break
        case 'breadcrumb':
          break
        case 'bulleted_list_item':
          if (block.has_children) {
            block.children = await FetchBlocks(block.id, block.last_edited_time)
          }
          break
        case 'callout':
          if (block.callout.icon?.type === 'external') {
            const iconUrl = block.callout.icon.external.url
            block.callout.icon.src = await saveImage(iconUrl, `block-${block.id}`)
          }
          break
        case 'child_database':
          // if (block.has_children) {
          const database_id = block.id
          block.database = await reqAPIWithBackoffAndCache<GetDatabaseResponseEx>('notion.databases.retrieve', notion.databases.retrieve, { database_id }, 3)
          console.log(block)
          // }
          break
        case 'child_page':
          block.page = await FetchPage(block.id, block.last_edited_time)
          // Unnecessary?
          // block.children = await FetchBlocks(block.id, block.last_edited_time)
          break
        case 'code':
          break
        case 'column_list':
          block.children = await FetchBlocks(block.id, block.last_edited_time)
          block.columns = []
          for (const b of block.children.results) {
            block.columns.push(await FetchBlocks(b.id, block.last_edited_time))
          }
          break
        case 'embed':
          block.embed.html = await getEmbedHtml(block)
          break
        case 'equation':
          break
        case 'file':
          break
        case 'image':
          const { id, image } = block
          if (image !== undefined) {
            const imageUrl = image.type === 'file' ? image.file.url : image.external.url
            block.image.src = await saveImage(imageUrl, `block-${id}`)
          }
          break
        case 'link_preview':
          break
        case 'numbered_list_item':
          if (block.has_children) {
            block.children = await FetchBlocks(block.id, block.last_edited_time)
          }
          break
        case 'paragraph':
          for (const richText of block.paragraph.rich_text) {
            if (richText.type !== 'mention') {
              continue
            }
            switch (richText.mention.type) {
              case 'database':
                const database_id = richText.mention.database.id
                const db = await reqAPIWithBackoffAndCache<GetDatabaseResponseEx>('notion.databases.retrieve', notion.databases.retrieve, { database_id }, 3)
                richText.mention.database.name = db.title.map(v => v.plain_text).join('')
                break
              case 'page':
                const page_id = richText.mention.page.id
                const page = await reqAPIWithBackoff<GetPageResponseEx>(notion.pages.retrieve, { page_id }, 3)
                for (const prop of Object.values(page.properties)) {
                  if (prop.type !== 'title') {
                    continue
                  }
                  richText.mention.page.name = prop.title.map(v => v.plain_text).join('')
                  break
                }
                break
            }
          }
          break
        case 'pdf':
          break
        case 'synced_block':
          break
        case 'table':
          block.children = await FetchBlocks(block.id, block.last_edited_time)
          break
        case 'table_of_contents':
          break
        case 'template':
          break
        case 'to_do':
          break
        case 'toggle':
          block.children = await FetchBlocks(block.id, block.last_edited_time)
          break
        case 'video':
          if (block.video.type === 'external') {
            block.video.html = await getVideoHtml(block)
          }
          break
        default:
          console.log(`error for ${block.type} contents get`, block)
          break
      }
    } catch (e) {
      console.log(`error for ${block.type} contents get`, block, e)
    }
  }

  await writeCache(cacheFile, list)

  return list
}
