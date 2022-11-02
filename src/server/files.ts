import fs from 'fs'
import { mkdir } from 'node:fs/promises'
import https from 'https'
import path from 'path'
import crypto from 'crypto'
import { promisify } from 'util'
import type {
  VideoBlockObjectResponseEx,
  EmbedBlockObjectResponseEx,
} from './types'

const docRoot = process.env.NOTIONATE_DOCROOT || 'public'
const imageDir = process.env.NOTIONATE_IMAGEDIR || 'images'

// @ts-ignore
https.get[promisify.custom] = function getAsync (url: any) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Notionate',
      },
    }
    https.get(url, options, (res) => {
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

const httpsGet = promisify(https.get)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const maxRedirects = 5

async function httpsGetWithFollowRedirects (reqUrl: string, redirectCount?: number): Promise<HttpGetResponse> {
  if (!redirectCount) {
    redirectCount = 0
  }
  const res = await httpsGet(reqUrl) as unknown as HttpGetResponse
  // @ts-ignore
  if (res.statusCode >= 300 && res.statusCode < 400 && res.rawHeaders.includes('Location')) {
    // @ts-ignore
    const i = res.rawHeaders.map((v, i) => v === 'Location' ? i : null).filter(v => v).shift()
    // @ts-ignore
    const redirectTo = res.rawHeaders[i + 1]
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

export const iconRegex = /<link\s+href="(?<path1>.*?)"\s+rel="icon"\s?\/?>|<link\s+rel="icon".*?href="(?<path2>.*?)"|<link\s+rel="shortcut icon"(\s+type="image\/x-icon")?\s+href="?(?<path3>.*?)"?\s?\/?>|<link\s+href="?(?<path4>.*?)"?\s+rel="(shortcut icon|icon shortcut)"(\s+type="image\/x-icon")?\s?\/?>/

export const getHtmlMeta = async (reqUrl: string): Promise<{ title: string, desc: string, image: string, icon: string }> => {
  const ogTitleRegex = /<meta\s+property="og:title"\s+content="(.*?)"\s?\/?>/
  const ogDescRegex = /<meta\s+property="og:description"\s+content="(.*?)"\s?\/?>/
  const ogImageRegex = /<meta\s+property="og:image"\s+content="(.*?)"\s?\/?>/
  const titleRegex = /<title>([\s\S]*?)<\/title>/
  const descRegex = /<meta\s+name="description"\s+content="([\s\S]*?)"\s?\/?>/
  const divRegex = /<div.*?>([\s\S]*?)<\/div>/
  const imageRegex = /src="(.*?)"/
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
    if (!descMatched) {
      descMatched = body.match(divRegex)
    }
    let imageMatched = body.match(ogImageRegex)
    if (!imageMatched) {
      const img = body.match(/<img\s(.*?)\s?\/?>/)
      if (img) {
        const imgTag = img[1]
        imageMatched = imgTag.match(imageRegex)
      }
    }
    const iconMatched = body.match(iconRegex)

    const title = titleMatched ? titleMatched[1].replaceAll('\n', ' ').trim() : 'unknown'
    const desc = descMatched ? descMatched[1].replaceAll('\n', ' ').trim().replace(/<[^>]*>?/gm, '') : 'unknown'
    const imagePath = imageMatched ? imageMatched[1] : ''
    const url = new URL(reqUrl)
    const imageUrl = imagePath !== '' ? (imagePath.includes('http') ? imagePath : `${url.protocol}//${url.hostname}${imagePath}`) : ''
    const image = imagePath !== '' ? await saveImage(imageUrl, 'html-image') : ''
    const iconPath = iconMatched && iconMatched.groups ? (iconMatched.groups.path1 || iconMatched.groups.path2 || iconMatched.groups.path3 || iconMatched.groups.path4) : ''
    const iconUrl = iconPath !== '' ? (iconPath.includes('http') ? iconPath : `${url.protocol}//${url.hostname}${iconPath}`) : ''
    const icon = iconUrl !== '' ? await saveImage(iconUrl, `html-icon-${atoh(reqUrl)}`) : ''
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
