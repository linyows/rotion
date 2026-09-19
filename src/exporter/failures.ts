import { AsyncLocalStorage } from 'node:async_hooks'
import {
  isNotionClientError,
  APIErrorCode,
  ClientErrorCode,
} from '@notionhq/client'
import { warn } from './log.js'
import { config } from './variables.js'

/**
 * HTTPStatusError is thrown for a response whose status is not 2xx.
 */
export class HTTPStatusError extends Error {
  status: number

  constructor (status: number, url: string) {
    super(`unexpected status ${status}: ${url}`)
    this.name = 'HTTPStatusError'
    this.status = status
  }
}

/**
 * Notion API errors that may succeed when the same request is sent again.
 * They are retried, and a result that still misses something because of one
 * of them is not cached.
 */
export const transientNotionErrorCodes: string[] = [
  APIErrorCode.RateLimited,
  APIErrorCode.InternalServerError,
  APIErrorCode.ServiceOverload,
  APIErrorCode.ServiceUnavailable,
  APIErrorCode.GatewayTimeout,
  ClientErrorCode.ResponseError,
  ClientErrorCode.RequestTimeout,
]

/**
 * isTransientError tells whether a failure may go away on the next attempt.
 * A missing page, a restricted resource or a 404 stays the same however many
 * times it is requested, so a result that lacks it can be cached. A rate
 * limit, a server error, a timeout or a network error can not, and anything
 * that is not known to be permanent counts as transient.
 */
export function isTransientError (error: unknown): boolean {
  const seen = new Set<unknown>()
  let e: unknown = error
  while (e && typeof e === 'object' && !seen.has(e)) {
    seen.add(e)
    if (e instanceof HTTPStatusError) {
      return e.status >= 500 || e.status === 408 || e.status === 429
    }
    if (isNotionClientError(e)) {
      return transientNotionErrorCodes.includes(e.code)
    }
    e = (e as { cause?: unknown }).cause
  }
  return true
}

interface Collector {
  transient: unknown[]
}

const collectors = new AsyncLocalStorage<Collector>()

/**
 * StrictModeError is thrown by reportFailure when ROTION_STRICT is true.
 */
export class StrictModeError extends Error {
  constructor (message: string, cause: unknown) {
    super(message, { cause })
    this.name = 'StrictModeError'
  }
}

/**
 * reportFailure is called for content that was caught failing and replaced
 * with a fallback, such as an image without a local copy. It warns, and
 * records the failure for collectFailures, which decides from the record
 * whether its result is complete. With ROTION_STRICT=true it throws instead,
 * so that a build does not publish a site with missing content.
 */
export function reportFailure (what: string, error: unknown): void {
  // Already reported where it happened, on its way out of an outer catch
  if (error instanceof StrictModeError) {
    throw error
  }
  warn(`failed to get ${what}`, error)
  if (config().strict) {
    throw new StrictModeError(`failed to get ${what} (ROTION_STRICT=true)`, error)
  }
  if (isTransientError(error)) {
    collectors.getStore()?.transient.push(error)
  }
}

/**
 * reportExtraFailure is reportFailure for extras that come from third
 * parties: bookmark metadata, embeds and link previews. It only warns. One
 * slow or rate-limited site should neither keep a page out of the cache nor
 * fail a strict build.
 */
export function reportExtraFailure (what: string, error: unknown): void {
  warn(`failed to get ${what}`, error)
}

/**
 * collectFailures runs fn and tells whether a transient failure was reported
 * while it ran, including in nested calls. Such a result is incomplete and
 * must not be cached. The failures are passed on to the caller's collector,
 * so that a result that contains this one is not cached either.
 */
export async function collectFailures<T> (fn: () => Promise<T>): Promise<{ value: T, complete: boolean }> {
  const collector: Collector = { transient: [] }
  const value = await collectors.run(collector, fn)
  if (collector.transient.length > 0) {
    collectors.getStore()?.transient.push(...collector.transient)
  }
  return { value, complete: collector.transient.length === 0 }
}
