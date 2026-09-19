import { test } from 'uvu'
import * as assert from 'uvu/assert'
import type { Link } from '../../types.js'
import { propertyOptions } from './options.js'

const link = (() => null) as unknown as Link

test('propertyOptions keeps a link that is a function', () => {
  const cardOpts = { link, query: { ref: 'gallery' } }
  const opts = propertyOptions('Name', cardOpts, { link, href: { Name: '/posts/[id]' } })

  assert.is(opts.link, link)
  assert.equal(opts.query, { ref: 'gallery' })
  assert.is(opts.pathname, '/posts/[id]')
})

test('propertyOptions adds the prefix and suffix of the property', () => {
  const opts = propertyOptions('Price', {}, { prefix: { Price: '$' }, suffix: { Price: ' USD' } })

  assert.is(opts.prefix, '$')
  assert.is(opts.suffix, ' USD')
  assert.is(opts.pathname, undefined)
})

test('propertyOptions leaves the options of the card unchanged', () => {
  const cardOpts = { link }
  const opts = propertyOptions('Name', cardOpts, { href: { Name: '/posts/[id]' } })

  assert.is.not(opts, cardOpts)
  assert.equal(Object.keys(cardOpts), ['link'])
})

test('propertyOptions returns a copy when there are no gallery options', () => {
  const cardOpts = { link }
  const opts = propertyOptions('Name', cardOpts)

  assert.is.not(opts, cardOpts)
  assert.is(opts.link, link)
})

test.run()
