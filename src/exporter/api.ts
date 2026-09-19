import { Client } from '@notionhq/client'
import {
  isNotionClientError,
  LogLevel,
} from '@notionhq/client'
import { transientNotionErrorCodes } from './failures.js'
import {
  atoh,
  readCache,
  writeCache,
  isAvailableCache,
} from './files.js'
import {
  cacheDir,
  waitingTimeSec,
  waitTimeSecAfterLimit,
  auth,
  debug,
} from './variables.js'

export const notion = new Client({ auth, logLevel: debug ? LogLevel.DEBUG : LogLevel.ERROR })

export interface reqAPIWithBackoffArgs {
  func: Function
  args: unknown
  count: number
}

const truncate = (str: string, max = 1000): string => {
  return str.length > max ? `${str.slice(0, max)}...` : str
}

/**
 * buildAPIErrorMessage keeps the reason of the failure in the message.
 * Without it, a validation error of the notion api -- a filter for a property
 * or an option that no longer exists, for example -- is indistinguishable
 * from a network failure.
 */
export function buildAPIErrorMessage (func: Function, args: unknown, error: unknown): string {
  const name = func.name === '' ? 'anonymous' : func.name
  const reason = error && typeof error === 'object' && isNotionClientError(error)
    ? `${error.code}: ${error.message}`
    : `${error}`
  return `request to notion api failed: ${name} -- ${reason}\n  args: ${truncate(JSON.stringify(args) ?? 'undefined')}`
}

export async function reqAPIWithBackoff<T> ({ func, args, count }: reqAPIWithBackoffArgs): Promise<T> {
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
    const retryable = error && typeof error === 'object' && isNotionClientError(error) && transientNotionErrorCodes.includes(error.code)
    if (retryable && count > 1) {
      if (debug) {
        console.log(`reqAPIWithBackoff backoff(${count}) -- error: ${error}`)
      }
      if (waitTimeSecAfterLimit > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
      }
      return await reqAPIWithBackoff<T>({ func, args, count: count - 1 })
    }
    if (debug) {
      console.error(`reqAPIWithBackoff error -- func: ${func.name}, args: ${JSON.stringify(args)}, error: ${error}`)
    }
    throw new Error(buildAPIErrorMessage(func, args, error), { cause: error })
  }

  if (res === null || res === undefined) {
    throw new Error(`request to notion api failed: ${func.name === '' ? 'anonymous' : func.name} -- empty response`)
  }

  return res
}

export interface reqAPIWithBackoffAndCacheArgs {
  name: string
  func: Function
  args: unknown
  count: number
}

export async function reqAPIWithBackoffAndCache<T> ( { name, func, args, count }: reqAPIWithBackoffAndCacheArgs): Promise<T> {
  const key = atoh(JSON.stringify({ func: func.name, args }))
  const cacheFile = `${cacheDir}/${name}-${key}`

  try {
    const cache = await readCache<T|null>(cacheFile)
    if (await isAvailableCache(cacheFile)) {
      return cache as T
    }
  } catch (_) {
    /* not fatal */
  }

  const res = await reqAPIWithBackoff<T>({ func, args, count })
  await writeCache(cacheFile, res)
  return res as T
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * fetchWithTimeout aborts the request when it takes longer than timeout
 * milliseconds. The limit also covers reading the body, so a server that
 * sends the headers and then stalls does not hold the caller forever.
 */
// TODO: replace http(s).get functions to this
export async function fetchWithTimeout(url: string | URL | Request, options: FetchOptions = {}): Promise<Response> {
  const { timeout = 5000, ...fetchOptions } = options
  try {
    return await fetch(url, { ...fetchOptions, signal: AbortSignal.timeout(timeout) })
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      throw new Error(`Request timed out after ${timeout}ms`, { cause: error })
    }
    throw error
  }
}
