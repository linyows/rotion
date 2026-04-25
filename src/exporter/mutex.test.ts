import fs from 'fs/promises'
import path from 'path'
import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import { withFileLock } from './mutex.js'

test.after.each(async () => {
  // Clean up any remaining lock files
  try {
    const testCacheDir = path.join(process.cwd(), '.cache', 'locks')
    const files = await fs.readdir(testCacheDir).catch(() => [])
    for (const file of files) {
      if (file.endsWith('.lock')) {
        await fs.unlink(path.join(testCacheDir, file)).catch(() => {})
      }
    }
  } catch {
    // Ignore cleanup errors
  }
})

test('withFileLock executes operation when no lock exists', async () => {
  let executed = false
  const operation = async () => {
    executed = true
    return 'success'
  }

  const result = await withFileLock('test-key-1', operation)

  assert.equal(result, 'success')
  assert.ok(executed)
})

test('withFileLock returns operation result', async () => {
  const expectedResult = { data: 'test', count: 42 }
  const operation = async () => expectedResult

  const result = await withFileLock('test-key-2', operation)

  assert.equal(result, expectedResult)
})

test('withFileLock handles operation errors', async () => {
  const operation = async () => {
    throw new Error('Test error')
  }

  try {
    await withFileLock('test-key-3', operation)
    assert.unreachable('Should have thrown an error')
  } catch (error: any) {
    assert.equal(error.message, 'Test error')
  }
})

test('withFileLock creates and removes lock file', async () => {
  const testCacheDir = path.join(process.cwd(), '.cache', 'locks')
  const lockFile = path.join(testCacheDir, 'test-key-4.lock')

  let lockExistsDuringOperation = false
  const operation = async () => {
    try {
      await fs.access(lockFile)
      lockExistsDuringOperation = true
    } catch {
      lockExistsDuringOperation = false
    }
    return 'done'
  }

  await withFileLock('test-key-4', operation)

  assert.ok(lockExistsDuringOperation, 'Lock file should exist during operation')

  // Lock file should be removed after operation
  try {
    await fs.access(lockFile)
    assert.unreachable('Lock file should be removed')
  } catch {
    // Expected - file should not exist
  }
})

test('withFileLock prevents concurrent execution', async () => {
  let executions = 0
  let concurrentCount = 0
  let maxConcurrent = 0

  const operation = async () => {
    concurrentCount++
    maxConcurrent = Math.max(maxConcurrent, concurrentCount)
    executions++

    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 50))

    concurrentCount--
    return executions
  }

  // Start multiple operations concurrently
  const promises = Array.from({ length: 3 }, () => 
    withFileLock('test-key-5', operation)
  )

  const results = await Promise.all(promises)

  assert.equal(maxConcurrent, 1, 'Only one operation should run at a time')
  assert.equal(executions, 3, 'All operations should complete')
  assert.equal(results.sort().join(','), '1,2,3', 'Results should be sequential')
})

test('withFileLock respects timeout option', async () => {
  const lockKey = 'test-key-6'

  // First operation holds lock for longer than timeout
  const longOperation = async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return 'long'
  }

  const shortTimeout = async () => {
    return 'short'
  }

  // Start long operation
  const longPromise = withFileLock(lockKey, longOperation)

  // Wait a bit to ensure first operation gets the lock
  await new Promise(resolve => setTimeout(resolve, 10))

  // Try to get lock with short timeout
  try {
    await withFileLock(lockKey, shortTimeout, { timeout: 100 })
    assert.unreachable('Should have timed out')
  } catch (error: any) {
    assert.match(error.message, /Failed to acquire lock/)
  }

  // Wait for first operation to complete
  const result = await longPromise
  assert.equal(result, 'long')
})

test('withFileLock respects retryInterval option', async () => {
  const lockKey = 'test-key-7'
  const retryTimes: number[] = []

  // Mock setTimeout to track retry intervals
  const originalSetTimeout = setTimeout
  const mockSetTimeout = td.func<typeof setTimeout>()
  td.when(mockSetTimeout(td.matchers.isA(Function), td.matchers.isA(Number)))
    .thenDo((fn: Function, delay: number) => {
      retryTimes.push(delay)
      return originalSetTimeout(fn, delay)
    })

  td.replace(global, 'setTimeout', mockSetTimeout)

  // First operation holds lock briefly
  const firstOperation = async () => {
    await new Promise(resolve => originalSetTimeout(resolve, 30))
    return 'first'
  }

  const secondOperation = async () => 'second'

  // Start first operation
  const firstPromise = withFileLock(lockKey, firstOperation)

  // Wait a bit then start second with custom retry interval
  await new Promise(resolve => originalSetTimeout(resolve, 10))
  const secondPromise = withFileLock(lockKey, secondOperation, { retryInterval: 25 })

  await Promise.all([firstPromise, secondPromise])

  // Should have retried with custom interval
  assert.ok(retryTimes.some(time => time === 25))

  td.reset()
})

test('withFileLock handles stale lock cleanup', async () => {
  const lockKey = 'test-key-8'
  const testCacheDir = path.join(process.cwd(), '.cache', 'locks')
  const lockFile = path.join(testCacheDir, `${lockKey}.lock`)

  // Create directory if it doesn't exist
  await fs.mkdir(testCacheDir, { recursive: true })

  // Create a stale lock file with a non-existent PID
  const staleLockData = JSON.stringify({
    pid: 999999, // Very unlikely to be a real PID
    timestamp: Date.now() - 120000, // 2 minutes ago
    key: lockKey
  })
  await fs.writeFile(lockFile, staleLockData)

  // Set file modification time to make it appear old
  const oldTime = new Date(Date.now() - 120000)
  await fs.utimes(lockFile, oldTime, oldTime)

  let executed = false
  const operation = async () => {
    executed = true
    return 'cleaned'
  }

  // Should clean up stale lock and execute
  const result = await withFileLock(lockKey, operation, { maxAge: 60000 })

  assert.equal(result, 'cleaned')
  assert.ok(executed)
})

test('withFileLock preserves lock from live process', async () => {
  const lockKey = 'test-key-9'
  const testCacheDir = path.join(process.cwd(), '.cache', 'locks')
  const lockFile = path.join(testCacheDir, `${lockKey}.lock`)

  // Create directory if it doesn't exist
  await fs.mkdir(testCacheDir, { recursive: true })

  // Create a lock file with current process PID (simulating active lock)
  const activeLockData = JSON.stringify({
    pid: process.pid,
    timestamp: Date.now() - 30000, // 30 seconds ago but process is alive
    key: lockKey
  })
  await fs.writeFile(lockFile, activeLockData)

  // Set file modification time to make it appear old
  const oldTime = new Date(Date.now() - 90000)
  await fs.utimes(lockFile, oldTime, oldTime)

  const operation = async () => 'should-timeout'

  // Should timeout because lock is from live process
  try {
    await withFileLock(lockKey, operation, { timeout: 100, maxAge: 60000 })
    assert.unreachable('Should have timed out')
  } catch (error: any) {
    assert.match(error.message, /Failed to acquire lock/)
  }

  // Clean up
  await fs.unlink(lockFile).catch(() => {})
})

test('withFileLock works with different lock keys simultaneously', async () => {
  const results: string[] = []

  const operation1 = async () => {
    await new Promise(resolve => setTimeout(resolve, 30))
    results.push('op1')
    return 'result1'
  }

  const operation2 = async () => {
    await new Promise(resolve => setTimeout(resolve, 30))
    results.push('op2')
    return 'result2'
  }

  // Different keys should allow concurrent execution
  const [result1, result2] = await Promise.all([
    withFileLock('key-a', operation1),
    withFileLock('key-b', operation2)
  ])

  assert.equal(result1, 'result1')
  assert.equal(result2, 'result2')
  assert.equal(results.length, 2)
  // Both should complete around the same time
  assert.ok(results.includes('op1'))
  assert.ok(results.includes('op2'))
})

// --- operationTimeout regression tests ---
//
// Defense-in-depth: even if an inner operation (e.g. a saveImage download)
// hangs forever, withFileLock must release the lock and surface a timeout
// error rather than letting the lock holder block all peers indefinitely.
// This is what cascaded into the cognano build deadlock when saveImage's
// `await res.end` never resolved after a request abort.

// Helper: run a promise against a hard wall-clock budget so a hang shows up
// as a clean assertion failure instead of locking up uvu.
async function runWithBudget<T> (p: Promise<T>, budgetMs: number): Promise<{ outcome: 'resolved' | 'rejected' | 'hang', value?: T, error?: any, elapsed: number }> {
  const start = Date.now()
  let outcome: 'resolved' | 'rejected' | 'hang' = 'hang'
  let value: T | undefined
  let error: any
  await Promise.race([
    p.then(v => { outcome = 'resolved'; value = v })
      .catch(e => { outcome = 'rejected'; error = e }),
    new Promise<void>(resolve => setTimeout(resolve, budgetMs)),
  ])
  return { outcome, value, error, elapsed: Date.now() - start }
}

test('withFileLock rejects with operationTimeout when operation hangs', async () => {
  const lockKey = 'test-op-timeout'
  const hangingOperation = () => new Promise(() => { /* never resolves */ })

  const { outcome, error, elapsed } = await runWithBudget(
    withFileLock(lockKey, hangingOperation, { operationTimeout: 200 }),
    3000,
  )

  assert.equal(outcome, 'rejected',
    `withFileLock should reject when operation hangs longer than operationTimeout (outcome=${outcome}, elapsed=${elapsed}ms)`)
  assert.ok(error, 'expected an error')
  assert.match(error.message, /operation timed out|operationTimeout/i,
    `error should mention operation timeout, got: ${error?.message}`)
  assert.ok(elapsed >= 200 && elapsed < 2000,
    `should fire near operationTimeout (~200ms), got ${elapsed}ms`)

  // Lock file must be released so the next acquirer can proceed
  const lockFile = path.join(process.cwd(), '.cache', 'locks', `${lockKey}.lock`)
  try {
    await fs.access(lockFile)
    assert.unreachable(`lock file should be removed after operationTimeout, but exists: ${lockFile}`)
  } catch {
    // expected: file does not exist
  }
})

test('withFileLock allows next acquirer immediately after operationTimeout fires', async () => {
  const lockKey = 'test-op-timeout-handoff'

  // Worker A holds the lock with a hanging operation.
  const aPromise = withFileLock(
    lockKey,
    () => new Promise(() => { /* never resolves */ }),
    { operationTimeout: 200 },
  ).catch(e => e)

  // Give A time to acquire the lock.
  await new Promise(resolve => setTimeout(resolve, 50))

  // Worker B waits and should succeed once A's operationTimeout releases the lock.
  const { outcome, value, elapsed } = await runWithBudget(
    withFileLock(lockKey, async () => 'B', { timeout: 5000 }),
    3000,
  )

  assert.equal(outcome, 'resolved',
    `B should acquire after A's operationTimeout (outcome=${outcome}, elapsed=${elapsed}ms)`)
  assert.equal(value, 'B')
  assert.ok(elapsed < 2000, `B should acquire shortly after A's operationTimeout, took ${elapsed}ms`)

  // A should have errored out, not silently hung
  const aErr = await aPromise
  assert.ok(aErr instanceof Error, 'A should have rejected with an error')
})

test.run()
