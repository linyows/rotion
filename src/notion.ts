import { Client } from '@notionhq/client'
import type {
  GetDatabaseResponse,
  GetUserResponse,
  GetPageResponse,
  GetSelfResponse,
  GetPagePropertyResponse,
  PropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import fs from 'fs'
import https from 'https'
import path from 'path'
import url from 'url'
import crypto from 'crypto'
import { promisify } from 'util'
import type {
  QueryDatabaseResponse,
  QueryDatabaseResponseEx,
  ListBlockChildrenResponseEx,
  BlockObjectResponse,
  GetPageResponseEx,
  RichTextItemResponse,
  VideoBlockObjectResponseEx,
  EmbedBlockObjectResponseEx,
  ImageBlockObjectResponseEx,
  GetDatabaseResponseEx,
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

const atoh = (a: string): string => {
  const shasum = crypto.createHash('sha1')
  shasum.update(a)
  return shasum.digest('hex')
}

const getHtmlMeta = async (url: string): Promise<{ title: string, desc: string, image: string }> => {
  const res = await fetch(url)
  if (!res.ok) {
    console.log('fetch api error:', url, res)
    return { title: '', desc: '', image: '', icon: '' }
  }
  const body = await res.text()

  const titleRegex = /<title>(.*?)<\/title>/
  const descRegex = /<meta\s+name="description"\s+content="(.*?)">/
  const imageRegex = /<meta\s+property="og:image"\s+content="(.*?)">/
  const titleMatched = body.match(titleRegex)
  const descMatched = body.match(descRegex)
  const imageMatched = body.match(imageRegex)

  const title = titleMatched ? titleMatched[1] : 'unknown'
  const desc = descMatched ? descMatched[1] : 'unknown'
  const imageUrl = imageMatched ? imageMatched[1] : ''
  const image = imageUrl !== '' ? await saveImage(imageUrl) : ''
  return { title, desc, image }
}

const getVideoHtml = async (block: VideoBlockObjectResponseEx): Promise<string> => {
  if (block.video?.type !== 'external') {
    return ''
  }
  const url = block.video?.external.url as string
  if (url.includes('youtube.com')) {
    const reqUrl = `https://www.youtube.com/oembed?url=${url}`
    const res = await fetch(reqUrl)
    if (!res.ok) {
      console.log('fetch api error:', reqUrl, res)
      return ''
    }
    const json = await res.json()
    return json.html
      .replace(/width=\"\d+\"/, 'width="100%"')
      .replace(/height=\"\d+\"/, 'height="100%"')

  } else {
    return ''
  }
}

const getEmbedHtml = async (block: EmbedBlockObjectResponseEx): Promise<string> => {
  if (!block.embed) {
    return ''
  } else if (block.embed.url.includes('twitter.com')) {
    const src = block.embed?.url || ''
    const tweetId = path.basename(src.split('?').shift() || '')
    const reqUrl = `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
    const res = await fetch(reqUrl)
    if (!res.ok) {
      console.log('fetch api error:', reqUrl, res)
      return ''
    }
    const json = await res.json()
    return json.html

  } else if (block.embed.url.includes('speakerdeck.com')) {
    const url = block.embed?.url as string
    const reqUrl = `https://speakerdeck.com/oembed.json?url=${url}`
    const res = await fetch(reqUrl)
    if (!res.ok) {
      console.log('fetch api error:', reqUrl, res)
      return ''
    }
    const json = await res.json()
    return json.html
      .replace(/width=\"\d+\"/, 'width="100%"')
      .replace(/height=\"\d+\"/, 'height="100%"')

  } else {
    return ''
  }
}

const saveImageInBlock = async (block: ImageBlockObjectResponseEx): Promise<string> => {
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
  const basename = path.basename(imageUrl.split('?').shift() || '')
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

const saveImage = async (imageUrl: string): Promise<string> => {
  const basename = path.basename(imageUrl.split('?').shift() || '')
  const myurl = url.parse(basename)
  const extname = path.extname(myurl.pathname as string)
  const filePath = `/images/${basename}`
  try {
    const res = await httpsGet(imageUrl) as unknown as HttpGetResponse
    res.pipe(fs.createWriteStream(`./public${filePath}`))
    await res.end
    console.log(`saved image: public${filePath}`)
  } catch (e) {
    console.log('saveImage error', e)
  }
  return filePath
}

export const FetchDatabase = async (database_id: string, limit?: number): Promise<QueryDatabaseResponseEx> => {
  const useCache = process.env.NOTION_CACHE === 'true'
  const cacheFile = `${cacheDir}/notion.databases.query-${database_id}${limit !== undefined ? `.limit-${limit}` : ''}`
  let cursor: undefined|string = undefined
  let allres: undefined|QueryDatabaseResponseEx = undefined

  if (useCache) {
    try {
      const list: QueryDatabaseResponseEx = JSON.parse(await readFile(cacheFile, 'utf8'))
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
      allres = res as QueryDatabaseResponseEx
    } else {
      allres.results.push(...res.results)
    }

    if (res.next_cursor === null || limit !== undefined) {
      break
    }

    cursor = res.next_cursor
  }
  
  for (const result of allres.results) {
    result.property_items = []
    for (const [k, v] of Object.entries(result.properties)) {
      const page_id = result.id
      const property_id = v.id
      const props = await notion.pages.properties.retrieve({ page_id, property_id })
      result.property_items.push(props)
    }
  }

  const meta = await notion.databases.retrieve({ database_id }) as GetDatabaseResponseEx
  if ('cover' in meta && meta.cover !== null) {
    const imageUrl = (meta.cover.type === 'external') ? meta.cover.external.url : meta.cover.file.url
    meta.cover.src = await saveImage(imageUrl)
  }
  allres.meta = meta

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

  if ('properties' in page) {
    let list: undefined|GetPagePropertyResponse = undefined
    for (const [k, v] of Object.entries(page.properties)) {
      const property_id = v.id
      const res = await notion.pages.properties.retrieve({ page_id, property_id })
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
        if (block.type === 'table' && block.table !== undefined) {
          block.children = await FetchBlocks(block.id)
        } else if (block.type === 'toggle' && block.toggle !== undefined) {
          block.children = await FetchBlocks(block.id)
        } else if (block.type === 'column_list' && block.column_list !== undefined) {
          block.children = await FetchBlocks(block.id)
          block.columns = []
          for (const b of block.children.results) {
            block.columns.push(await FetchBlocks(b.id))
          }
        } else if (block.type === 'child_page' && block.child_page !== undefined) {
          block.page = await FetchPage(block.id)
          block.children = await FetchBlocks(block.id)
        } else if (block.type === 'child_database' && block.child_database !== undefined) {
          const database_id = block.id
          block.database = await notion.databases.retrieve({ database_id })
        } else if (block.type === 'bookmark' && block.bookmark !== undefined) {
          block.bookmark.site = await getHtmlMeta(block.bookmark.url)
        } else if (block.type === 'image' && block.image !== undefined) {
          block.image.src = await saveImageInBlock(block)
        } else if (block.type === 'video' && block.video !== undefined && block.video.type === 'external') {
          block.video.html = await getVideoHtml(block)
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
