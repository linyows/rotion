import { readFileSync } from 'fs'
import path from 'path'

/**
 * RotionConfig holds the settings of the exporter. Each one comes from an
 * environment variable, unless it is given to configure().
 */
export interface RotionConfig {
  /** NOTION_TOKEN */
  auth?: string
  /** ROTION_CACHEDIR */
  cacheDir: string
  /** ROTION_DOCROOT */
  docRoot: string
  /** ROTION_IMAGEDIR */
  imageDir: string
  /** ROTION_FILEDIR */
  fileDir: string
  /** ROTION_INCREMENTAL_CACHE */
  incrementalCache: boolean
  /** ROTION_CACHE_AVAILABLE_DURATION, in milliseconds */
  cacheAvailableDuration: number
  /** ROTION_WAITTIME, in milliseconds */
  waitTime: number
  /** ROTION_LIMITED_WAITTIME, in milliseconds */
  limitedWaitTime: number
  /** ROTION_TIMEOUT, in milliseconds */
  timeout: number
  /** ROTION_WEBP_QUALITY */
  webpQuality: number
  /** ROTION_MAX_REDIRECTS */
  maxRedirects: number
  /** ROTION_UA */
  userAgent: string
  /** GOOGLEMAP_KEY */
  googleMapKey?: string
  /** ROTION_SKIP_QUERY_VALIDATION */
  skipQueryValidation: boolean
  /** ROTION_STRICT */
  strict: boolean
  /** ROTION_DEBUG */
  debug: boolean
}

let overrides: Partial<RotionConfig> = {}

/**
 * configure sets settings in code, for a setup where environment variables
 * are inconvenient: several tokens, or a framework that does not put .env
 * into process.env. A value given here wins over its environment variable.
 * Later calls add to earlier ones; pass undefined to go back to the
 * environment variable.
 */
export function configure (options: Partial<RotionConfig>): void {
  overrides = { ...overrides, ...options }
}

/**
 * resetConfiguration drops everything given to configure(). For tests.
 */
export function resetConfiguration (): void {
  overrides = {}
}

const int = (value: string | undefined, fallback: number): number => {
  if (value === undefined || value === '') {
    return fallback
  }
  const n = parseInt(value, 10)
  return Number.isNaN(n) ? fallback : n
}

const userAgents = new Map<string, string>()

/**
 * The default user agent is the name and version in the package.json of the
 * working directory. A server may start elsewhere, or be deployed without
 * package.json, so a missing or unreadable file falls back to "rotion".
 */
function defaultUserAgent (): string {
  const cwd = process.cwd()
  let ua = userAgents.get(cwd)
  if (ua === undefined) {
    try {
      const pkg = JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf8'))
      ua = pkg.name && pkg.version ? `${pkg.name}/${pkg.version}` : 'rotion'
    } catch {
      ua = 'rotion'
    }
    userAgents.set(cwd, ua)
  }
  return ua
}

/**
 * config returns the current settings. It reads the environment on every
 * call, so a variable set after rotion is imported still takes effect.
 */
export function config (): RotionConfig {
  const env = process.env
  const fromEnv: RotionConfig = {
    auth: env.NOTION_TOKEN,
    cacheDir: env.ROTION_CACHEDIR || '.cache',
    docRoot: env.ROTION_DOCROOT || 'public',
    imageDir: env.ROTION_IMAGEDIR || 'images',
    fileDir: env.ROTION_FILEDIR || 'files',
    incrementalCache: env.ROTION_INCREMENTAL_CACHE === 'true',
    cacheAvailableDuration: int(env.ROTION_CACHE_AVAILABLE_DURATION, 60 * 2 * 1000),
    waitTime: int(env.ROTION_WAITTIME, 0),
    limitedWaitTime: int(env.ROTION_LIMITED_WAITTIME, 60 * 1000),
    timeout: int(env.ROTION_TIMEOUT, 1500),
    webpQuality: int(env.ROTION_WEBP_QUALITY, 95),
    maxRedirects: int(env.ROTION_MAX_REDIRECTS, 5),
    userAgent: env.ROTION_UA || defaultUserAgent(),
    googleMapKey: env.GOOGLEMAP_KEY,
    skipQueryValidation: env.ROTION_SKIP_QUERY_VALIDATION === 'true',
    strict: env.ROTION_STRICT === 'true',
    debug: env.ROTION_DEBUG === 'true',
  }
  const set = Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined))
  return { ...fromEnv, ...set }
}

// For testing purposes only: Skip actual file downloads in saveImage/saveFile
export const isSkipDownload = () => process.env.ROTION_SKIP_DOWNLOAD === 'true'

/**
 * httpOptions are the options of the HTTP requests Rotion makes itself.
 */
export const httpOptions = () => {
  const { timeout, userAgent } = config()
  return {
    timeout,
    headers: {
      'User-Agent': userAgent,
      Accept: '*/*',
    },
  }
}
