import { promises as fs } from 'fs'
import path from 'path'
import { config } from './variables.js'
import { warn } from './log.js'

interface LockOptions {
  timeout?: number // Lock acquisition timeout (milliseconds)
  retryInterval?: number // Retry interval (milliseconds)
  maxAge?: number // Auto-cleanup time for stale lock files (milliseconds)
  operationTimeout?: number // Hard upper bound on the wrapped operation
                            // (milliseconds). Defense-in-depth: if the
                            // operation hangs (e.g. a stalled HTTP download),
                            // the lock is forcibly released and the call
                            // rejects instead of blocking peers indefinitely.
}

const DEFAULT_OPTIONS: Required<LockOptions> = {
  timeout: 600000, // 10 minutes — must accommodate long operations like
                   // FetchDatabase that wrap many sequential image downloads
                   // inside a single critical section.
  retryInterval: 100, // 100ms
  maxAge: 60000, // 1 minute
  operationTimeout: 600000, // 10 minutes — same upper bound as `timeout` so a
                            // hanging operation cannot keep the lock past the
                            // window in which other waiters would give up.
}

/**
 * Performs exclusive control using file-based mutex
 */
export async function withFileLock<T>(
  key: string,
  operation: () => Promise<T>,
  options: LockOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const lockDir = path.join(config().cacheDir, 'locks')
  const lockFile = path.join(lockDir, `${key}.lock`)

  await fs.mkdir(lockDir, { recursive: true })

  const startTime = Date.now()
  let fd: fs.FileHandle | null = null

  while (Date.now() - startTime < opts.timeout) {
    try {
      // Cleanup stale lock files
      await cleanupStaleLock(lockFile, opts.maxAge)

      // Create lock file exclusively
      fd = await fs.open(lockFile, 'wx')

      // Write process ID and timestamp
      const lockData = JSON.stringify({
        pid: process.pid,
        timestamp: Date.now(),
        key
      })
      await fd.writeFile(lockData)

      if (config().debug) {
        console.log(`Lock acquired: ${key} (pid: ${process.pid})`)
      }

      // Execute operation, bounded by operationTimeout so a hanging
      // operation cannot wedge the lock indefinitely.
      try {
        const result = await runWithOperationTimeout(operation, opts.operationTimeout, key)
        return result
      } finally {
        // Release lock
        await releaseLock(fd, lockFile, key)
      }

    } catch (error: any) {
      if (error.code === 'EEXIST') {
        // Lock file already exists - wait and retry
        await new Promise(resolve => setTimeout(resolve, opts.retryInterval))
        continue
      }
      throw error
    }
  }

  throw new Error(`Failed to acquire lock for "${key}" within ${opts.timeout}ms`)
}

/**
 * Cleanup stale lock files
 */
async function cleanupStaleLock(lockFile: string, maxAge: number): Promise<void> {
  try {
    const stats = await fs.stat(lockFile)
    const age = Date.now() - stats.mtime.getTime()

    if (age > maxAge) {
      const pid = await readLockPid(lockFile)

      // A lock holder writes its pid right after creating the file, so a lock
      // older than maxAge without a readable pid was left by a process that
      // died in between. Nothing will ever remove it, and without this it
      // would hold every waiter until the timeout.
      if (pid === undefined || !isProcessAlive(pid)) {
        await fs.unlink(lockFile)
        if (config().debug) {
          const reason = pid === undefined ? 'no readable pid' : `dead pid: ${pid}`
          console.log(`Cleaned up stale lock: ${lockFile} (${reason})`)
        }
      }
    }
  } catch {
    // Ignore if file doesn't exist or can't be read
  }
}

/**
 * Read the pid a lock file was written with, or undefined when the file is
 * empty or does not hold one.
 */
async function readLockPid(lockFile: string): Promise<number | undefined> {
  const lockData = await fs.readFile(lockFile, 'utf-8')
  try {
    const { pid } = JSON.parse(lockData)
    return Number.isInteger(pid) ? pid : undefined
  } catch {
    return undefined
  }
}

/**
 * Check if process is alive
 */
function isProcessAlive(pid: number): boolean {
  try {
    // Signal 0 doesn't actually send a signal, just checks process existence
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

/**
 * Race the operation against an operation-level timeout. The operation may
 * still continue running after the timeout fires (we cannot synchronously
 * cancel an arbitrary Promise), but the lock will be released and an error
 * propagated so peers waiting on the same lock can make progress.
 */
async function runWithOperationTimeout<T> (
  operation: () => Promise<T>,
  operationTimeout: number,
  key: string,
): Promise<T> {
  let timer: NodeJS.Timeout | undefined
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`operation timed out for "${key}" after ${operationTimeout}ms`))
    }, operationTimeout)
    // Don't keep the event loop alive solely for the timeout.
    if (typeof timer.unref === 'function') timer.unref()
  })
  try {
    return await Promise.race([operation(), timeoutPromise])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

/**
 * Release lock
 */
async function releaseLock(fd: fs.FileHandle, lockFile: string, key: string): Promise<void> {
  try {
    await fd.close()
    await fs.unlink(lockFile)
    if (config().debug) {
      console.log(`Lock released: ${key} (pid: ${process.pid})`)
    }
  } catch (error) {
    // A lock file left behind makes the next caller wait until it is stale
    warn(`failed to release the lock ${lockFile}`, error)
  }
} 
