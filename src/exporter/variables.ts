import pkg from '../../package.json' assert { type: 'json' }

export const cacheDir = process.env.ROTION_CACHEDIR || '.cache'
export const waitingTimeSec = (process.env.ROTION_WAITTIME || 0) as number
export const waitTimeSecAfterLimit = (process.env.ROTION_LIMITED_WAITTIME || 60 * 1000) as number
export const incrementalCache = process.env.ROTION_INCREMENTAL_CACHE === 'true'
export const auth = process.env.NOTION_TOKEN
export const docRoot = process.env.ROTION_DOCROOT || 'public'
export const imageDir = process.env.ROTION_IMAGEDIR || 'images'
export const timeout = process.env.ROTION_TIMEOUT ? parseInt(process.env.ROTION_TIMEOUT) : 1500
export const webpQuality = process.env.ROTION_WEBP_QUALITY ? parseInt(process.env.ROTION_WEBP_QUALITY) : 95
export const debug = process.env.ROTION_DEBUG === 'true'
export const httpOptions = {
  timeout,
  headers: {
    'User-Agent': `${pkg.name}/${pkg.version}`,
    Accept: '*/*',
  },
}
