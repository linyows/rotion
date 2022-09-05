import fs from 'fs'
import { mkdir } from 'node:fs/promises'
import https from 'https'
import path from 'path'
import url from 'url'
import crypto from 'crypto'
import { promisify } from 'util'
import type {
  VideoBlockObjectResponseEx,
  EmbedBlockObjectResponseEx,
  ImageBlockObjectResponseEx,
} from './types'

const docRoot = process.env.NOTIONATE_DOCROOT || 'public'
const imageDir = process.env.NOTIONATE_IMAGEDIR || 'images'

// @ts-ignore
https.get[promisify.custom] = function getAsync (options: any) {
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

// https://oembed.com/
type Oembed = {
  type: 'photo'|'video'|'link'|'rich'
  version: number
  title?: string
  author_name?: string
  author_url?: string
  provider_name?: string
  provider_url?: string
  cache_age?: string
  thumbnail_url?: string
  thumbnail_width?: number
  thumbnail_height?: number
}

type SpeakerdeckOembedResponse = Oembed & {
  type: 'rich'
  title: string
  author_name: string
  author_url: string
  provider_name: 'Speaker Deck'
  provider_url: 'https://speakerdeck.com/'
  width: number
  height: number
  ratio: number
  html: string
}

type YoutubeOembedResponse = Oembed & {
  type: 'video'
  title: string
  author_name: string
  author_url: string
  provider_name: 'YouTube'
  provider_url: 'https://www.youtube.com/'
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
  width: number
  height: number
  html: string
}

type TwitterOembedResponse = Oembed & {
  type: 'rich'
  author_name: string
  author_url: string
  provider_name: 'Twitter'
  provider_url: 'https://twitter.com/'
  width: number
  height: number
  url: string
  html: string
  cache_age: string
}

type GetJsonError = {
  error: string
}

const httpsGet = promisify(https.get)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

async function getHTTP (reqUrl: string): Promise<string> {
  let body = ''
  const res = await httpsGet(reqUrl)
  // @ts-ignore
  for await (const chunk of res) {
    body += chunk
  }
  return body
}

async function getJson<T> (reqUrl: string): Promise<T|GetJsonError> {
  try {
    const body = await getHTTP(reqUrl)
    return JSON.parse(body) as T
  } catch (e) {
    return JSON.parse(`{ "error": "${reqUrl} -- ${e}"}`) as GetJsonError
  }
}

const atoh = (a: string): string => {
  const shasum = crypto.createHash('sha1')
  shasum.update(a)
  return shasum.digest('hex')
}

export const createDirWhenNotfound = async (dir: string): Promise<void> => {
  if (!fs.existsSync(dir)) {
    await mkdir(dir, { recursive: true })
    console.log(`created direcotry: ${dir}`)
  }
}

export const saveImage = async (imageUrl: string): Promise<string> => {
  const urlWithoutQuerystring = imageUrl.split('?').shift() || ''
  const basename = path.basename(urlWithoutQuerystring)
  // const myurl = url.parse(basename)
  // const extname = path.extname(myurl.pathname as string)
  const prefix = atoh(urlWithoutQuerystring)
  const urlPath = `/${imageDir}/${prefix}-${basename}`
  const filePath = `${docRoot}${urlPath}`
  await createDirWhenNotfound(`${docRoot}/${imageDir}`)
  try {
    const res = await httpsGet(imageUrl) as unknown as HttpGetResponse
    res.pipe(fs.createWriteStream(filePath))
    await res.end
    console.log(`saved image: ${filePath}`)
  } catch (e) {
    console.log('saveImage error', e)
  }
  return urlPath
}

export const getHtmlMeta = async (reqUrl: string): Promise<{ title: string, desc: string, image: string, icon: string }> => {
  const ogTitleRegex = /<meta\s+property="og:title"\s+content="(.*?)">/
  const ogDescRegex = /<meta\s+property="og:description"\s+content="(.*?)">/
  const ogImageRegex = /<meta\s+property="og:image"\s+content="(.*?)">/
  const titleRegex = /<title>(.*?)<\/title>/
  const descRegex = /<meta\s+name="description"\s+content="(.*?)">/
  const iconRegex = /<link\s+href="(.*?)"\s+rel="icon"\s?\/?>|<link\s+rel="icon"\s+href="(.*?)"\s?\/?>/
  try {
    const body = await getHTTP(reqUrl)

    let titleMatched = body.match(ogTitleRegex)
    if (!titleMatched) {
      titleMatched = body.match(titleRegex)
    }
    let descMatched = body.match(ogDescRegex)
    if (!descMatched) {
      descMatched = body.match(descRegex)
    }
    const imageMatched = body.match(ogImageRegex)
    const iconMatched = body.match(iconRegex)

    const title = titleMatched ? titleMatched[1] : 'unknown'
    const desc = descMatched ? descMatched[1] : 'unknown'
    const imageUrl = imageMatched ? imageMatched[1] : ''
    const image = imageUrl !== '' ? await saveImage(imageUrl) : ''
    const iconUrl = iconMatched ? (iconMatched[1] || iconMatched[2]) : ''
    const icon = iconUrl !== '' ? await saveImage(iconUrl) : ''
    return { title, desc, image, icon }
  } catch (e) {
    console.log(`getHtmlMeta failure: ${reqUrl} -- ${e}`)
  }
  return { title: '', desc: '', image: '', icon: '' }
}

export const getVideoHtml = async (block: VideoBlockObjectResponseEx): Promise<string> => {
  if (block.video?.type !== 'external') {
    return ''
  }
  const extUrl = block.video?.external.url as string
  if (extUrl.includes('youtube.com')) {
    const reqUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(extUrl)}`
    const json = await getJson<YoutubeOembedResponse>(reqUrl)
    if ('error' in json) {
      console.log(`getVideoHtml failure: ${json.error}`)
    } else {
      return json.html
        .replace(/width="\d+"/, 'width="100%"')
        .replace(/height="\d+"/, 'height="100%"')
    }
  }
  return ''
}

export const getEmbedHtml = async (block: EmbedBlockObjectResponseEx): Promise<string> => {
  if (block.embed && block.embed.url.includes('twitter.com')) {
    const src = block.embed?.url || ''
    const tweetId = path.basename(src.split('?').shift() || '')
    const reqUrl = `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
    const json = await getJson<TwitterOembedResponse>(reqUrl)
    if ('error' in json) {
      console.log(`getEmbedHtml failure: ${json.error}`)
    } else {
      return json.html
    }
  } else if (block.embed && block.embed.url.includes('speakerdeck.com')) {
    const embedUrl = block.embed?.url as string
    const reqUrl = `https://speakerdeck.com/oembed.json?url=${encodeURIComponent(embedUrl)}`

    /*
     * The `UND_ERR_SOCKET` error occurs when GET request to the speakerdeck.com using the fetch api. That's why this using the https module.
     * A bug report has been created
     * https://github.com/nodejs/undici/issues/1412
     */
    const json = await getJson<SpeakerdeckOembedResponse>(reqUrl)
    if ('error' in json) {
      console.log(`getEmbedHtml failure: ${json.error}`)
    } else {
      return json.html
        .replace(/width="\d+"/, 'width="100%"')
        .replace(/height="\d+"/, 'height="100%"')
    }
  }

  return ''
}

export const saveImageInBlock = async (block: ImageBlockObjectResponseEx): Promise<string> => {
  /* eslint-disable no-unused-vars */
  const { id, last_edited_time, image } = block
  if (image === undefined) {
    return ''
  }
  const imageUrl = image.type === 'file' ? image.file.url : image.external.url
  const basename = path.basename(imageUrl)
  /* eslint-disable n/no-deprecated-api */
  const myurl = url.parse(basename)
  const extname = path.extname(myurl.pathname as string)
  const urlPath = `/${imageDir}/${id}${extname}`
  const filePath = `${docRoot}${urlPath}`
  await createDirWhenNotfound(`${docRoot}/${imageDir}`)
  try {
    const res = await httpsGet(imageUrl) as unknown as HttpGetResponse
    res.pipe(fs.createWriteStream(filePath))
    await res.end
    console.log(`saved image: ${filePath}`)
  } catch (e) {
    console.log('saveImageInBlock error', e)
  }
  return urlPath
}

export const saveImageInPage = async (imageUrl: string, idWithKey: string): Promise<string> => {
  const basename = path.basename(imageUrl.split('?').shift() || '')
  /* eslint-disable n/no-deprecated-api */
  const myurl = url.parse(basename)
  const extname = path.extname(myurl.pathname as string)
  const urlPath = `/${imageDir}/${idWithKey}${extname}`
  const filePath = `${docRoot}${urlPath}`
  await createDirWhenNotfound(`${docRoot}/${imageDir}`)
  try {
    const res = await httpsGet(imageUrl) as unknown as HttpGetResponse
    res.pipe(fs.createWriteStream(filePath))
    await res.end
    console.log(`saved image: ${filePath}`)
  } catch (e) {
    console.log('saveImageInPage error', e)
  }
  return urlPath
}

export async function readCache<T> (f: string): Promise<T> {
  return JSON.parse(await readFile(f, 'utf8'))
}

export async function writeCache (f: string, data: unknown): Promise<void> {
  return writeFile(f, JSON.stringify(data), 'utf8').catch(() => {})
}
