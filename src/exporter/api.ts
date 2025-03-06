import { Client } from '@notionhq/client'
import {
  isNotionClientError,
  APIErrorCode,
  ClientErrorCode,
  LogLevel,
} from '@notionhq/client'
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
    if (error && typeof error === 'object' && isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.RateLimited:
        case APIErrorCode.InternalServerError:
        case ClientErrorCode.ResponseError:
        case ClientErrorCode.RequestTimeout:
          if (debug) {
            console.log(`reqAPIWithBackoff backoff(${count}) -- error code: ${error.code}`)
          }
          if (waitTimeSecAfterLimit > 0) {
            await new Promise(resolve => setTimeout(resolve, waitTimeSecAfterLimit))
          }
          res = await reqAPIWithBackoff<T>({ func, args, count: count - 1 })
          break
      }
    }
    if (debug) {
      console.error(`reqAPIWithBackoff error -- func: ${func.name}, args: ${JSON.stringify(args)}, error: ${error}`)
    }
  }

  if (res === null) {
    throw new Error(`request to notion api failed: ${func.name}`)
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

// TODO: replace http(s).get functions to this
export async function fetchWithTimeout(url: string | URL | Request, options: FetchOptions = {}): Promise<Response> {
  const { timeout = 5000, ...fetchOptions } = options
  const controller = new AbortController()
  const { signal } = controller

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  options.signal = signal

  try {
    const response = await fetch(url, fetchOptions)
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`)
    }
    throw error
  }
}
