import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import * as notion from '../../src/server/notion'

test.before(() => {
  td.reset()
})

test('parse NOTION_CACHE', async ()=> {
  const tests: [string | undefined, boolean][] = [
    [undefined, true],
    ['0', false],
    ['1', true],
    ['true', true],
    ['false', false],
    ['y', true],
    ['n', false],
  ]
  for (const [v, ex] of tests) {
    assert.equal(notion.parseNotionCache(v), ex)
  }
})

test.run()
