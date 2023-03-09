import fs from 'fs'
import { mkdir } from 'node:fs/promises'
import https from 'https'
import http from 'http'
import path from 'path'
import crypto from 'crypto'
import { promisify } from 'util'
import type {
  VideoBlockObjectResponseEx,
  EmbedBlockObjectResponseEx,
} from './types'
import pkg from '../../package.json'

const docRoot = process.env.NOTIONATE_DOCROOT || 'public'
const imageDir = process.env.NOTIONATE_IMAGEDIR || 'images'
const timeout = 1500
const httpOptions = {
  timeout,
  headers: {
    'User-Agent': `${pkg.name}/${pkg.version}`,
    Accept: '*/*',
  },
}

// @ts-ignore
https.get[promisify.custom] = function getAsync (url: any) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, httpOptions, (res) => {
      // @ts-ignore
      res.end = new Promise((resolve) => res.on('end', resolve))
      resolve(res)
    })
    req.on('error', reject)
    req.on('timeout', () => {
      console.log(`request timed out(${timeout}ms): ${url}`)
      req.abort()
      return reject
    })
  })
}

// @ts-ignore
http.get[promisify.custom] = function getAsync (url: any) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, httpOptions, (res) => {
      // @ts-ignore
      res.end = new Promise((resolve) => res.on('end', resolve))
      resolve(res)
    })
    req.on('error', reject)
    req.on('timeout', () => {
      console.log(`request timed out(${timeout}ms): ${url}`)
      req.abort()
      return reject
    })
  })
}

type HttpGetResponse = {
  pipe: Function
  end: Promise<unknown>
  statusCode: number
  rawHeaders: string[]
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

const httpsGet = promisify(https.get)
const httpGet = promisify(http.get)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const maxRedirects = 5

export const findLocationUrl = (rawHeaders: string[]): string => {
  for (let i = 0; i <= rawHeaders.length; i++) {
    if (rawHeaders[i] === 'Location') {
      const next = 1
      return rawHeaders[i + next]
    }
  }
  console.log('location header url is not found', rawHeaders)
  return ''
}

async function httpsGetWithFollowRedirects (reqUrl: string, redirectCount?: number): Promise<HttpGetResponse> {
  if (!redirectCount) {
    redirectCount = 0
  }

  const httpFunc = (reqUrl.includes('https://')) ? httpsGet : httpGet
  const res = await httpFunc(reqUrl) as unknown as HttpGetResponse

  if (res.statusCode >= 300 && res.statusCode < 400 && res.rawHeaders.includes('Location')) {
    const redirectTo = findLocationUrl(res.rawHeaders)
    redirectCount++
    if (maxRedirects < redirectCount) {
      console.log('maximum number of redirects exceeded')
      return res
    }
    return await httpsGetWithFollowRedirects(redirectTo, redirectCount)
  } else {
    return res
  }
}

async function getHTTP (reqUrl: string, redirectCount?: number): Promise<string> {
  if (!redirectCount) {
    redirectCount = 0
  }
  let body = ''
  const res = await httpsGetWithFollowRedirects(reqUrl)
  // @ts-ignore
  for await (const chunk of res) {
    body += chunk
  }
  return body
}

export async function getJson<T> (reqUrl: string): Promise<T> {
  const body = await getHTTP(reqUrl)
  return JSON.parse(body) as T
}

export const atoh = (a: string): string => {
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

export async function readCache<T> (f: string): Promise<T> {
  return JSON.parse(await readFile(f, 'utf8'))
}

export async function writeCache (f: string, data: unknown): Promise<void> {
  return writeFile(f, JSON.stringify(data), 'utf8').catch(() => {})
}

export const saveImage = async (imageUrl: string, prefix: string): Promise<string> => {
  const urlWithoutQuerystring = imageUrl.split('?').shift() || ''
  const { ext, name } = path.parse(urlWithoutQuerystring)
  const basename = `${atoh(name)}${ext}`
  const urlPath = `/${imageDir}/${prefix}-${basename}`
  const filePath = `${docRoot}${urlPath}`

  await createDirWhenNotfound(`${docRoot}/${imageDir}`)

  if (fs.existsSync(filePath)) {
    return urlPath
  }

  try {
    const res = await httpsGetWithFollowRedirects(imageUrl)
    res.pipe(fs.createWriteStream(filePath))
    await res.end
    console.log(`saved image -- path: ${filePath}, url: ${imageUrl}`)
  } catch (e) {
    console.log(`saveImage error -- path: ${filePath}, url: ${imageUrl}, message: ${e}`)
  }

  return urlPath
}

export const findHtmlByRegexp = (regexps: RegExp[], html: string): string | null => {
  let matched: RegExpMatchArray | null = null

  for (let i = 0; i < regexps.length; i++) {
    const result = html.match(regexps[i])
    if (result !== null) {
      matched = result
      break
    }
  }

  if (matched === null) {
    return null
  }

  return matched[1]
    .replaceAll('\n', ' ')
    .trim()
    .replace(/<[^>]*>?/gm, '')
    .replaceAll('https:https:', 'https:')
}

export const titleRegexps = [
  /property="og:title"\s+content="([^"]+)"/,
  /<title>([^"]*?)<\/title>/,
  /<title\s+[^"]+="[^"]+">([^"]*?)<\/title>/,
]

export const descRegexps = [
  /property="og:description"\s+content="([^"]+)"/,
  /content="([^"]+)"\s+property="og:description"/,
  /name="description"\s+content="([^"]+)"/,
  /content="([^"]+)"\s+name="description"/,
  /<div.*?>([\s\S]*?)<\/div>/,
]

export const imageRegexps = [
  /property="og:image:secure_url"\s+content="([^"]+)"/,
  /property="og:image"\s+content="([^"]+)"/,
  /content="([^"]+)"\s+property="og:image:secure_url"/,
  /content="([^"]+)"\s+property="og:image"/,
]

export const iconRegexps = [
  /<link\s+href="([^"]+)"\s+rel="icon"/,
  /<link\s+rel="icon"\s+href="(\/favicon\.ico)"\s*?\/?>/,
  /<link\s+rel="icon".*?href="([^"]+)"/,
  /<link\s+rel="shortcut icon"\s+type="image\/x-icon"\s+href="?([^"]+)"?\s?\/?>/,
  /<link\s+rel="shortcut icon"\s+href="?([^"]+)"?\s?\/?>/,
  /<link\s+href="?([^"]+)"?\s+rel="(shortcut icon|icon shortcut)"(\s+type="image\/x-icon")?\s?\/?>/,
  /<link\s+href="([^"]+)"\s+rel="icon"\s+sizes="[^"]+"\s+type="image\/[^"]"\s*\/?>/,
  /type="image\/x-icon"\s+href="(\/favicon\.ico)"/,
  /rel="icon"\s+href="(\/favicon\.ico)"/,
  /rel="shortcut icon"\s+href="([^"]+)"/,
]

export const findImage = (html: string): string | null => {
  const img = html.match(/<img\s(.*?)\s?\/?>/)
  if (img !== null) {
    const imgTag = img[1]
    const imageRegex = /src="(.*?)"/
    const result = imgTag.match(imageRegex)
    if (result !== null) {
      return result[1]
    }
  }
  return null
}

export const getHtmlMeta = async (reqUrl: string): Promise<{ title: string, desc: string, image: string, icon: string }> => {
  try {
    const resbody = await getHTTP(reqUrl)
    const body = resbody.replaceAll('\n', ' ')

    const title = findHtmlByRegexp(titleRegexps, body) || ''
    const desc = findHtmlByRegexp(descRegexps, body) || ''
    const imagePath = findHtmlByRegexp(imageRegexps, body) || findImage(body) || ''
    const iconPath = findHtmlByRegexp(iconRegexps, body) || ''

    const url = new URL(reqUrl)
    const imageUrl = imagePath !== '' ? (imagePath.match(/^(https?:|data:)/) ? imagePath : `${url.protocol}//${url.hostname}${imagePath}`) : ''
    const image = imagePath !== '' ? (imagePath.match(/^data:/) ? imagePath : await saveImage(imageUrl, 'html-image')) : ''
    const iconUrl = iconPath !== '' ? (iconPath.match(/^(https?:|data:)/) ? iconPath : `${url.protocol}//${url.hostname}${iconPath}`) : ''
    const icon = iconUrl !== '' ? (iconPath.match(/^data:/) ? iconPath : await saveImage(iconUrl, `html-icon-${atoh(reqUrl)}`)) : ''

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
  if (extUrl.includes('youtube.com') || extUrl.includes('youtu.be')) {
    const reqUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(extUrl)}`
    try {
      const json = await getJson<YoutubeOembedResponse>(reqUrl)
      return json.html
    } catch (e) {
      console.log(`getVideoHtml failure: ${reqUrl} - ${e}`)
    }
  }
  return ''
}

export const getEmbedHtml = async (block: EmbedBlockObjectResponseEx): Promise<string> => {
  if (block.embed && block.embed.url.includes('twitter.com')) {
    const src = block.embed?.url || ''
    const tweetId = path.basename(src.split('?').shift() || '')
    const reqUrl = `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
    try {
      const json = await getJson<TwitterOembedResponse>(reqUrl)
      return json.html
    } catch (e) {
      console.log(`getEmbedHtml failure: ${reqUrl} - ${e}`)
    }
  } else if (block.embed && block.embed.url.includes('speakerdeck.com')) {
    const embedUrl = block.embed?.url as string
    const reqUrl = `https://speakerdeck.com/oembed.json?url=${encodeURIComponent(embedUrl)}`

    /*
     * The `UND_ERR_SOCKET` error occurs when GET request to the speakerdeck.com using the fetch api. That's why this using the https module.
     * A bug report has been created
     * https://github.com/nodejs/undici/issues/1412
     */
    try {
      const json = await getJson<SpeakerdeckOembedResponse>(reqUrl)
      return json.html
    } catch (e) {
      console.log(`getEmbedHtml failure: ${reqUrl} -- ${e}`)
    }
  }

  return ''
}
