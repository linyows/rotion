import { debug } from './variables.js'

const messageOf = (error: unknown): string => error instanceof Error ? error.message : String(error)

/**
 * warn prints one line to stderr for something that makes the output
 * incomplete or slower, whether or not ROTION_DEBUG is set. Only the first
 * line of the error message is printed; ROTION_DEBUG adds the whole error.
 */
export function warn (message: string, error?: unknown): void {
  const reason = error === undefined ? '' : `: ${messageOf(error).split('\n')[0]}`
  console.warn(`[rotion] ${message}${reason}`)
  if (debug && error !== undefined) {
    console.warn(error)
  }
}
