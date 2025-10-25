import { readFileSync } from 'fs'
const pkg = JSON.parse(readFileSync('./package.json').toString())

export const cacheDir = process.env.ROTION_CACHEDIR || '.cache'
export const waitingTimeSec = (process.env.ROTION_WAITTIME || 0) as number
export const waitTimeSecAfterLimit = (process.env.ROTION_LIMITED_WAITTIME || 60 * 1000) as number
export const incrementalCache = process.env.ROTION_INCREMENTAL_CACHE === 'true'
export const cacheAvailableDuration = (process.env.ROTION_CACHE_AVAILABLE_DURATION || 60 * 2 * 1000) as number
export const auth = process.env.NOTION_TOKEN
export const googleMapKey = process.env.GOOGLEMAP_KEY
export const docRoot = process.env.ROTION_DOCROOT || 'public'
export const imageDir = process.env.ROTION_IMAGEDIR || 'images'
export const fileDir = process.env.ROTION_FILEDIR || 'files'
export const timeout = process.env.ROTION_TIMEOUT ? parseInt(process.env.ROTION_TIMEOUT) : 1500
export const webpQuality = process.env.ROTION_WEBP_QUALITY ? parseInt(process.env.ROTION_WEBP_QUALITY) : 95
export const debug = process.env.ROTION_DEBUG === 'true'
export const maxRedirects = process.env.ROTION_MAX_REDIRECTS ? parseInt(process.env.ROTION_MAX_REDIRECTS) : 5
export const userAgent = process.env.ROTION_UA || `${pkg.name}/${pkg.version}`
// For testing purposes only: Skip actual file downloads in saveImage/saveFile
export const isSkipDownload = () => process.env.ROTION_SKIP_DOWNLOAD === 'true'
export const httpOptions = {
  timeout,
  headers: {
    'User-Agent': `${userAgent}`,
    Accept: '*/*',
  },
}
