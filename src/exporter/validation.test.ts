import { test } from 'uvu'
import * as assert from 'uvu/assert'
import type { QueryProperties } from './validation.js'
import { validateQuery, buildQueryValidationMessage } from './validation.js'

const properties: QueryProperties = {
  Name: { id: 'title', name: 'Name', description: null, type: 'title', title: {} },
  Published: { id: 'aBcD', name: 'Published', description: null, type: 'checkbox', checkbox: {} },
  Tags: {
    id: 'eFgH',
    name: 'Tags',
    description: null,
    type: 'multi_select',
    multi_select: {
      options: [
        { id: '1', name: 'Blog', color: 'blue', description: null },
        { id: '2', name: 'Release', color: 'red', description: null },
      ],
    },
  },
  Status: {
    id: 'iJkL',
    name: 'Status',
    description: null,
    type: 'status',
    status: {
      options: [
        { id: '1', name: 'Done', color: 'green', description: null },
      ],
      groups: [],
    },
  },
  Date: { id: 'mNoP', name: 'Date', description: null, type: 'date', date: {} },
}

test('validateQuery returns no error for a valid query', () => {
  const errors = validateQuery({
    properties,
    filter: {
      and: [
        { property: 'Published', checkbox: { equals: true } },
        { property: 'Tags', multi_select: { does_not_contain: 'Blog' } },
      ],
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })
  assert.equal(errors, [])
})

test('validateQuery detects a nonexistent multi_select option', () => {
  const errors = validateQuery({
    properties,
    filter: {
      and: [
        { property: 'Published', checkbox: { equals: true } },
        { property: 'Tags', multi_select: { does_not_contain: 'News' } },
      ],
    },
  })
  assert.equal(errors.length, 1)
  assert.ok(errors[0]?.includes('filter.and[1].multi_select.does_not_contain'))
  assert.ok(errors[0]?.includes('"News" is not an option of the "Tags" property'))
  assert.ok(errors[0]?.includes('"Blog", "Release"'))
})

test('validateQuery detects a nonexistent status option', () => {
  const errors = validateQuery({
    properties,
    filter: { property: 'Status', status: { equals: 'WIP' } },
  })
  assert.equal(errors.length, 1)
  assert.ok(errors[0]?.includes('"WIP" is not an option of the "Status" property'))
})

test('validateQuery detects a nonexistent property', () => {
  const errors = validateQuery({
    properties,
    filter: { property: 'Categories', multi_select: { contains: 'Blog' } },
  })
  assert.equal(errors.length, 1)
  assert.ok(errors[0]?.includes('property "Categories" does not exist in the database'))
  assert.ok(errors[0]?.includes('"Name", "Published", "Tags", "Status", "Date"'))
})

test('validateQuery detects a property type mismatch', () => {
  const errors = validateQuery({
    properties,
    filter: { property: 'Tags', select: { equals: 'Blog' } },
  })
  assert.equal(errors.length, 1)
  assert.ok(errors[0]?.includes('is a "multi_select" property, but the filter uses "select"'))
})

test('validateQuery accepts a property id instead of a property name', () => {
  const errors = validateQuery({
    properties,
    filter: { property: 'eFgH', multi_select: { contains: 'Blog' } },
  })
  assert.equal(errors, [])
})

test('validateQuery reports the property name when the query uses a property id', () => {
  const errors = validateQuery({
    properties,
    filter: { property: 'eFgH', multi_select: { contains: 'News' } },
  })
  assert.equal(errors.length, 1)
  assert.ok(errors[0]?.includes('is not an option of the "Tags" property'))
})

test('validateQuery accepts a rich_text filter on a title property', () => {
  const errors = validateQuery({
    properties,
    filter: { property: 'Name', rich_text: { contains: 'rotion' } },
  })
  assert.equal(errors, [])
})

test('validateQuery skips a timestamp filter and a timestamp sort', () => {
  const errors = validateQuery({
    properties,
    filter: { timestamp: 'created_time', created_time: { past_week: {} } },
    sorts: [{ timestamp: 'last_edited_time', direction: 'ascending' }],
  })
  assert.equal(errors, [])
})

test('validateQuery ignores is_empty which is not an option name', () => {
  const errors = validateQuery({
    properties,
    filter: { property: 'Tags', multi_select: { is_empty: true } },
  })
  assert.equal(errors, [])
})

test('validateQuery detects a nonexistent property in sorts', () => {
  const errors = validateQuery({
    properties,
    sorts: [{ property: 'Datetime', direction: 'descending' }],
  })
  assert.equal(errors.length, 1)
  assert.ok(errors[0]?.includes('sorts[0]: property "Datetime" does not exist'))
})

test('validateQuery collects errors of nested compound filters', () => {
  const errors = validateQuery({
    properties,
    filter: {
      or: [
        { property: 'Tags', multi_select: { contains: 'News' } },
        { and: [{ property: 'Unknown', checkbox: { equals: true } }] },
      ],
    },
  })
  assert.equal(errors.length, 2)
  assert.ok(errors[0]?.startsWith('filter.or[0].multi_select.contains'))
  assert.ok(errors[1]?.startsWith('filter.or[1].and[0]'))
})

test('validateQuery returns no error when properties are unknown', () => {
  assert.equal(validateQuery({ filter: { property: 'Whatever', checkbox: { equals: true } } }), [])
  assert.equal(validateQuery({ properties: {}, filter: { property: 'Whatever', checkbox: { equals: true } } }), [])
})

test('buildQueryValidationMessage lists every error', () => {
  const msg = buildQueryValidationMessage('database "Projects" (abc)', ['first', 'second'])
  assert.ok(msg.includes('invalid query for database "Projects" (abc):'))
  assert.ok(msg.includes('\n  - first\n  - second'))
  assert.ok(msg.includes('ROTION_SKIP_QUERY_VALIDATION=true'))
})

test.run()
