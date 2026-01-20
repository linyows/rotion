import { test } from 'uvu'
import * as assert from 'uvu/assert'

const testsEnvParseNumber = [
  ['ROTION_WAITTIME', 'waitingTimeSec', '5000', 5000, 0],
  ['ROTION_LIMITED_WAITTIME', 'waitTimeSecAfterLimit', '30000', 30000, 60 * 1000],
  ['ROTION_CACHE_AVAILABLE_DURATION', 'cacheAvailableDuration', '300000', 300000, 60 * 2 * 1000],
] as const

for (const [envKey, varName, envValue, expected, defaultValue] of testsEnvParseNumber) {
  test(`${varName} is number type when ${envKey} is set to "${envValue}"`, async () => {
    const originalEnv = process.env[envKey]
    process.env[envKey] = envValue

    const modulePath = new URL('./variables.js', import.meta.url).href
    const module = await import(`${modulePath}?t=${Date.now()}`)

    assert.type(module[varName], 'number')
    assert.equal(module[varName], expected)

    if (originalEnv === undefined) {
      delete process.env[envKey]
    } else {
      process.env[envKey] = originalEnv
    }
  })

  test(`${varName} defaults to ${defaultValue} when ${envKey} is not set`, async () => {
    const originalEnv = process.env[envKey]
    delete process.env[envKey]

    const modulePath = new URL('./variables.js', import.meta.url).href
    const module = await import(`${modulePath}?t=${Date.now()}`)

    assert.type(module[varName], 'number')
    assert.equal(module[varName], defaultValue)

    if (originalEnv !== undefined) {
      process.env[envKey] = originalEnv
    }
  })
}

test('cacheAvailableDuration arithmetic produces number not string', async () => {
  const originalEnv = process.env.ROTION_CACHE_AVAILABLE_DURATION
  process.env.ROTION_CACHE_AVAILABLE_DURATION = '120000'

  const modulePath = new URL('./variables.js', import.meta.url).href
  const module = await import(`${modulePath}?t=${Date.now()}`)

  const mtime = 1700000000000
  const result = mtime + module.cacheAvailableDuration

  assert.type(result, 'number')
  assert.equal(result, 1700000120000)
  assert.not.equal(result, '1700000000000120000')

  if (originalEnv === undefined) {
    delete process.env.ROTION_CACHE_AVAILABLE_DURATION
  } else {
    process.env.ROTION_CACHE_AVAILABLE_DURATION = originalEnv
  }
})

test.run()
