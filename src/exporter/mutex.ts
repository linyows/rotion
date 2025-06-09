import { promises as fs } from 'fs'
import path from 'path'
import { cacheDir, debug } from './variables.js'
import { createDirWhenNotfound } from './files.js'

interface LockOptions {
  timeout?: number // Lock acquisition timeout (milliseconds)
  retryInterval?: number // Retry interval (milliseconds)
  maxAge?: number // Auto-cleanup time for stale lock files (milliseconds)
}

const DEFAULT_OPTIONS: Required<LockOptions> = {
  timeout: 30000, // 30 seconds
  retryInterval: 100, // 100ms
  maxAge: 60000, // 1 minute
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
  const lockDir = path.join(cacheDir, 'locks')
  const lockFile = path.join(lockDir, `${key}.lock`)
  
  await createDirWhenNotfound(lockDir)
  
  const startTime = Date.now()
  let fd: fs.FileHandle | null = null
  
  while (Date.now() - startTime < opts.timeout) {
    try {
      // Cleanup stale lock files
      await cleanupStalelock(lockFile, opts.maxAge)
      
      // Create lock file exclusively
      fd = await fs.open(lockFile, 'wx')
      
      // Write process ID and timestamp
      const lockData = JSON.stringify({
        pid: process.pid,
        timestamp: Date.now(),
        key
      })
      await fd.writeFile(lockData)
      
      if (debug) {
        console.log(`Lock acquired: ${key} (pid: ${process.pid})`)
      }
      
      // Execute operation
      try {
        const result = await operation()
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
async function cleanupStalelock(lockFile: string, maxAge: number): Promise<void> {
  try {
    const stats = await fs.stat(lockFile)
    const age = Date.now() - stats.mtime.getTime()
    
    if (age > maxAge) {
      const lockData = await fs.readFile(lockFile, 'utf-8')
      const lock = JSON.parse(lockData)
      
      // Check if process is alive
      if (!isProcessAlive(lock.pid)) {
        await fs.unlink(lockFile)
        if (debug) {
          console.log(`Cleaned up stale lock: ${lockFile} (dead pid: ${lock.pid})`)
        }
      }
    }
  } catch {
    // Ignore if file doesn't exist or can't be read
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
 * Release lock
 */
async function releaseLock(fd: fs.FileHandle, lockFile: string, key: string): Promise<void> {
  try {
    await fd.close()
    await fs.unlink(lockFile)
    if (debug) {
      console.log(`Lock released: ${key} (pid: ${process.pid})`)
    }
  } catch (error) {
    if (debug) {
      console.error(`Failed to release lock: ${key}`, error)
    }
  }
} 