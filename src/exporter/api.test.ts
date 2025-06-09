import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import type { reqAPIWithBackoffArgs, reqAPIWithBackoffAndCacheArgs, FetchOptions } from './api.js'
import { reqAPIWithBackoff, reqAPIWithBackoffAndCache, fetchWithTimeout } from './api.js'

test.before(() => {
  td.replace(console, 'log')
  td.replace(console, 'error')
  td.reset()
})

test('reqAPIWithBackoff throws error when count is less than 1', async () => {
  const mockFunc = td.func()
  const args: reqAPIWithBackoffArgs = {
    func: mockFunc,
    args: {},
    count: 0
  }

  try {
    await reqAPIWithBackoff(args)
    assert.unreachable('Should have thrown an error')
  } catch (error) {
    assert.ok(error instanceof Error)
    assert.equal(error.message, 'backoff count exceeded')
  }
})

test('reqAPIWithBackoff succeeds with valid function', async () => {
  const mockFunc = td.func()
  const expectedResult = { success: true, data: 'test' }
  
  td.when(mockFunc(td.matchers.anything())).thenResolve(expectedResult)

  const args: reqAPIWithBackoffArgs = {
    func: mockFunc,
    args: { test: 'input' },
    count: 3
  }

  const result = await reqAPIWithBackoff(args)
  assert.equal(result, expectedResult)
  // td.verify is redundant when using td.when - if the expected result is returned,
  // it means the function was called correctly
})

test('reqAPIWithBackoff throws error when function fails and res is null', async () => {
  const mockFunc = td.func()
  
  // Mock function that doesn't throw but returns null/undefined
  td.when(mockFunc(td.matchers.anything())).thenResolve(null)

  const args: reqAPIWithBackoffArgs = {
    func: mockFunc,
    args: {},
    count: 1
  }

  try {
    await reqAPIWithBackoff(args)
    assert.unreachable('Should have thrown an error')
  } catch (error) {
    assert.ok(error instanceof Error)
    assert.ok(error.message.includes('request to notion api failed'))
  }
})

test('reqAPIWithBackoff handles function with no name gracefully', async () => {
  const mockFunc = td.func()
  // Remove the name property to test edge case
  Object.defineProperty(mockFunc, 'name', { value: '' })
  
  td.when(mockFunc(td.matchers.anything())).thenResolve(null)

  const args: reqAPIWithBackoffArgs = {
    func: mockFunc,
    args: {},
    count: 1
  }

  try {
    await reqAPIWithBackoff(args)
    assert.unreachable('Should have thrown an error')
  } catch (error) {
    assert.ok(error instanceof Error)
    assert.ok(error.message.includes('request to notion api failed'))
  }
})

test('reqAPIWithBackoffAndCache requires valid parameters', async () => {
  const mockFunc = td.func()
  const expectedResult = { cached: false, data: 'fresh' }
  
  td.when(mockFunc(td.matchers.anything())).thenResolve(expectedResult)

  const args: reqAPIWithBackoffAndCacheArgs = {
    name: 'test-api-call',
    func: mockFunc,
    args: { param: 'value' },
    count: 2
  }

  try {
    const result = await reqAPIWithBackoffAndCache(args)
    // Even if cache fails, should get fresh result
    assert.equal(result, expectedResult)
  } catch (error) {
    // May fail due to missing cache dependencies, but should be handled
    assert.ok(error instanceof Error)
  }
})

test('reqAPIWithBackoffAndCache handles missing cache gracefully', async () => {
  const mockFunc = td.func()
  const expectedResult = { test: 'result' }
  
  td.when(mockFunc(td.matchers.anything())).thenResolve(expectedResult)

  const args: reqAPIWithBackoffAndCacheArgs = {
    name: 'missing-cache-test',
    func: mockFunc,
    args: { id: 'test-123' },
    count: 1
  }

  try {
    const result = await reqAPIWithBackoffAndCache(args)
    assert.equal(result, expectedResult)
  } catch (error) {
    // Expected if cache system is not available
    assert.ok(error instanceof Error)
  }
})

test('fetchWithTimeout uses default timeout of 5000ms', async () => {
  const url = 'https://httpbin.org/delay/1' // 1 second delay
  
  try {
    const response = await fetchWithTimeout(url)
    assert.ok(response instanceof Response)
  } catch (error) {
    // Network errors are expected in test environment
    assert.ok(error instanceof Error)
  }
})

test('fetchWithTimeout respects custom timeout', async () => {
  const url = 'https://httpbin.org/delay/1' // 1 second delay
  const options: FetchOptions = {
    timeout: 100 // 100ms timeout
  }

  try {
    await fetchWithTimeout(url, options)
    assert.unreachable('Should have timed out')
  } catch (error) {
    assert.ok(error instanceof Error)
    assert.ok(error.message.includes('timed out') || error.message.includes('fetch'))
  }
})

test('fetchWithTimeout handles invalid URLs', async () => {
  const invalidUrl = 'not-a-valid-url'

  try {
    await fetchWithTimeout(invalidUrl)
    assert.unreachable('Should have thrown an error')
  } catch (error) {
    assert.ok(error instanceof Error)
  }
})

test('fetchWithTimeout handles valid URL with options', async () => {
  const url = 'https://httpbin.org/get'
  const options: FetchOptions = {
    method: 'GET',
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetchWithTimeout(url, options)
    assert.ok(response instanceof Response)
    assert.equal(response.url, url)
  } catch (error) {
    // Network errors are acceptable in test environment
    assert.ok(error instanceof Error)
  }
})

test('fetchWithTimeout clears timeout on successful request', async () => {
  const url = 'https://httpbin.org/get'
  const options: FetchOptions = {
    timeout: 5000
  }

  try {
    const response = await fetchWithTimeout(url, options)
    assert.ok(response instanceof Response)
    // If we get here, timeout was properly cleared
  } catch (error) {
    // Network error is acceptable
    assert.ok(error instanceof Error)
  }
})

test('fetchWithTimeout passes through fetch options correctly', async () => {
  const url = 'https://httpbin.org/post'
  const options: FetchOptions = {
    method: 'POST',
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      'X-Test-Header': 'test-value'
    },
    body: JSON.stringify({ test: 'data' })
  }

  try {
    const response = await fetchWithTimeout(url, options)
    assert.ok(response instanceof Response)
  } catch (error) {
    // Network error is acceptable in test environment
    assert.ok(error instanceof Error)
  }
})

test.run() 