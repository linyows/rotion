import { Client } from '@notionhq/client'
import type {
  QueryDatabaseResponse,
  GetDatabaseResponse,
  GetUserResponse,
  GetPageResponse,
  GetSelfResponse,
} from '@notionhq/client/build/src/api-endpoints'
import fs from 'fs'
import https from 'https'
import path from 'path'
import url from 'url'
import { promisify } from 'util'
import type {
  ListBlockChildrenResponseEx,
  BlockObjectResponse,
  GetPageResponseEx,
  RichTextItemResponse,
} from './types'

// @ts-ignore
https.get[promisify.custom] = function getAsync(options: any) {
  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      // @ts-ignore
      res.end = new Promise((resolve) => res.on('end', resolve))
      resolve(res)
    }).on('error', reject)
  })
}

type HttpGetResponse = {
  pipe: Function
  end: Promise<unknown>
}

const httpsGet = promisify(https.get)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const cacheDir = '.cache'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const isEmpty = (obj: Object) => {
  return !Object.keys(obj).length
}

const getTwitterHtml = async (block: BlockObjectResponse): Promise<string> => {
  const src = block.embed?.url as string
  const tweetId = path.basename(src)
  const res = await fetch(`https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`)
  const json = await res.json()
  return json.html
}

const getSpeakerdeckHtml = async (block: BlockObjectResponse): Promise<string> => {
  const url = block.embed?.url as string
  const res = await fetch(`https://speakerdeck.com/oembed.json?url=${url}`)
  const json = await res.json()
  return json.html
    .replace(/width=\"\d+\"/, 'width="100%"')
    .replace(/height=\"\d+\"/, 'height="100%"')
}

const saveImageInBlock = async (block: BlockObjectResponse): Promise<string> => {
  const { id, last_edited_time, image } = block
  if (image === undefined) {
    return ''
  }
  const imageUrl = image.type === 'file' ? image.file.url : image.external.url
  const basename = path.basename(imageUrl)
  const myurl = url.parse(basename)
  const extname = path.extname(myurl.pathname as string)
  const filePath = `/images/${id}${extname}`
  try {
    const res = await httpsGet(imageUrl) as unknown as HttpGetResponse
    res.pipe(fs.createWriteStream(`./public${filePath}`))
    await res.end
    console.log(`saved image: public${filePath}`)
  } catch (e) {
    console.log('saveImageInBlock error', e)
  }
  return filePath
}

const saveImageInPage = async (imageUrl: string, idWithKey: string): Promise<string> => {
  const basename = path.basename(imageUrl)
  const myurl = url.parse(basename)
  const extname = path.extname(myurl.pathname as string)
  const filePath = `/images/${idWithKey}${extname}`
  try {
    const res = await httpsGet(imageUrl) as unknown as HttpGetResponse
    res.pipe(fs.createWriteStream(`./public${filePath}`))
    await res.end
    console.log(`saved image: public${filePath}`)
  } catch (e) {
    console.log('saveImageInPage error', e)
  }
  return filePath
}

export const FetchDatabase = async (database_id: string, limit?: number): Promise<QueryDatabaseResponse> => {
  const useCache = process.env.NOTION_CACHE === 'true'
  const cacheFile = `${cacheDir}/notion.databases.query-${database_id}${limit !== undefined ? `.limit-${limit}` : ''}`
  let cursor: undefined|string = undefined
  let allres: undefined|QueryDatabaseResponse = undefined

  if (useCache) {
    try {
      const list: QueryDatabaseResponse = JSON.parse(await readFile(cacheFile, 'utf8'))
      if (!isEmpty(list)) {
        return list
      }
    } catch (_) {
      /* not fatal */
    }
  }

  while (true) {
    const res: QueryDatabaseResponse = await notion.databases.query({
      database_id,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
      start_cursor: cursor,
      page_size: limit || 100,
    })

    if (allres === undefined) {
      allres = res
    } else {
      allres.results.push(...res.results)
    }

    if (res.next_cursor === null || limit !== undefined) {
      break
    }

    cursor = res.next_cursor
  }

  if (useCache) {
    await writeFile(cacheFile, JSON.stringify(allres), 'utf8').catch(() => {})
  }

  return allres
}

export const FetchPage = async (page_id: string): Promise<GetPageResponseEx> => {
  const useCache = process.env.NOTION_CACHE === 'true'
  const cacheFile = `${cacheDir}/notion.pages.retrieve-${page_id}`

  if (useCache) {
    try {
      const page: GetPageResponse = JSON.parse(await readFile(cacheFile, 'utf8'))
      if (!isEmpty(page)) {
        return page as GetPageResponseEx
      }
    } catch (_) {
      /* not fatal */
    }
  }

  let page = await notion.pages.retrieve({ page_id }) as GetPageResponseEx

  if (useCache) {
    if (page.cover !== null) {
      if (page.cover.type === 'external') {
        page.cover.src = await saveImageInPage(page.cover.external.url, `${page.id}-cover-external`)
      } else if (page.cover.type === 'file') {
        page.cover.src = await saveImageInPage(page.cover.file.url, `${page.id}-cover-file`)
      }
    }
    if (page.icon?.type === 'file') {
      page.icon.src = await saveImageInPage(page.icon.file.url, `${page.id}-icon-file`)
    }
    await writeFile(cacheFile, JSON.stringify(page), 'utf8').catch(() => {})
  } else {
    if (page.cover !== null) {
      if (page.cover.type === 'external') {
        page.cover.src = page.cover.external.url
      } else if (page.cover.type === 'file') {
        page.cover.src = page.cover.file.url
      }
    }
    if (page.icon?.type === 'file') {
      page.icon.src = page.icon.file.url
    }
  }

  return page
}

export const FetchBlocks = async (block_id: string): Promise<ListBlockChildrenResponseEx> => {
  const useCache = process.env.NOTION_CACHE === 'true'
  const cacheFile = `${cacheDir}/notion.blocks.children.list-${block_id}`

  if (useCache) {
    try {
      const list: ListBlockChildrenResponseEx = JSON.parse(await readFile(cacheFile, 'utf8'))
      if (!isEmpty(list)) {
        return list
      }
    } catch (_) {
      /* not fatal */
    }
  }

  let list = await notion.blocks.children.list({ block_id }) as ListBlockChildrenResponseEx

  if (useCache) {
    for (const block of list.results) {
      try {
        if (block.type === 'table' && block.table !== undefined && block.has_children) {
          block.children = await FetchBlocks(block.id)
        } else if (block.type === 'toggle' && block.toggle !== undefined && block.has_children) {
          block.children = await FetchBlocks(block.id)
        } else if (block.type === 'column_list' && block.column_list !== undefined && block.has_children) {
          block.children = await FetchBlocks(block.id)
          block.columns = []
          for (const b of block.children.results) {
            block.columns.push(await FetchBlocks(b.id))
          }
        } else if (block.type === 'child_page' && block.child_page !== undefined) {
          block.page = await FetchPage(block.id)
          block.children = await FetchBlocks(block.id)
        } else if (block.type === 'bookmark' && block.bookmark !== undefined) {
          block.bookmark.site = await getHtmlMeta(block.bookmark.url)
        } else if (block.type === 'image' && block.image !== undefined) {
          block.image.src = await saveImageInBlock(block)
        } else if (block.type === 'embed' && block.embed !== undefined) {
          block.embed.html = await getEmbedHtml(block)
        }
      } catch (e) {
        console.log(`error for ${block.type} contents get`, block, e)
      }
    }
    await writeFile(cacheFile, JSON.stringify(list), 'utf8').catch(() => {})
  }

  return list
}

export const FetchRetrieveDatabase = async (database_id: string) => {
  const res: GetDatabaseResponse = await notion.databases.retrieve({ database_id })
}

export const FetchRetrieveUser = async (user_id: string) => {
  const res: GetUserResponse = await notion.users.retrieve({ user_id })
}
