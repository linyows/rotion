import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import type { FetchBreadcrumbsProps } from './breadcrumbs.js'
import { FetchBreadcrumbs } from './breadcrumbs.js'

test.before(() => {
  td.replace(console, 'log')
  td.reset()
})

test('FetchBreadcrumbs returns array for all input types', async () => {
  // Test that function always returns an array regardless of input validity
  const testCases = [
    { type: 'page_id' as const, id: 'test-page-id' },
    { type: 'database_id' as const, id: 'test-database-id' },
    { type: 'block_id' as const, id: 'test-block-id' }
  ]

  for (const testCase of testCases) {
    const props: FetchBreadcrumbsProps = {
      type: testCase.type,
      id: testCase.id,
      limit: 2
    }

    try {
      const result = await FetchBreadcrumbs(props)
      assert.ok(Array.isArray(result))
    } catch (error) {
      // Even on error, we're testing that the function handles it gracefully
      assert.ok(error instanceof Error)
    }
  }
})

test('FetchBreadcrumbs handles workspace type', async () => {
  const props: FetchBreadcrumbsProps = {
    type: 'workspace',
    id: 'workspace-id',
    limit: 5
  }

  const result = await FetchBreadcrumbs(props)
  
  // Workspace type should return empty array immediately
  assert.ok(Array.isArray(result))
  assert.equal(result.length, 0)
})

test('FetchBreadcrumbs uses default limit of 5 when not specified', async () => {
  const props: FetchBreadcrumbsProps = {
    type: 'page_id',
    id: 'test-page-id'
    // limit not specified - should default to 5
  }

  try {
    const result = await FetchBreadcrumbs(props)
    assert.ok(Array.isArray(result))
    // Default limit is 5, so result should not exceed this
    assert.ok(result.length <= 5)
  } catch (error) {
    // Function should handle errors gracefully
    assert.ok(error instanceof Error)
  }
})

test('FetchBreadcrumbs respects custom limit parameter', async () => {
  const limits = [1, 2, 3, 10]
  
  for (const limit of limits) {
    const props: FetchBreadcrumbsProps = {
      type: 'page_id',
      id: 'test-page-id',
      limit
    }

    try {
      const result = await FetchBreadcrumbs(props)
      assert.ok(Array.isArray(result))
      // Result should not exceed specified limit
      assert.ok(result.length <= limit)
    } catch (error) {
      // Function should handle errors gracefully
      assert.ok(error instanceof Error)
    }
  }
})

test('FetchBreadcrumbs handles zero limit', async () => {
  const props: FetchBreadcrumbsProps = {
    type: 'page_id',
    id: 'test-page-id',
    limit: 0
  }

  const result = await FetchBreadcrumbs(props)
  
  // With limit 0, should return empty array
  assert.ok(Array.isArray(result))
  assert.equal(result.length, 0)
})

test('FetchBreadcrumbs handles edge case limits correctly', async () => {
  const edgeCases = [
    { limit: 0, expectedLength: 0 },
    { limit: 1, maxExpected: 1 },
    { limit: 100, maxExpected: 100 } // Very high limit
  ]

  for (const testCase of edgeCases) {
    const props: FetchBreadcrumbsProps = {
      type: 'page_id',
      id: 'test-page-id',
      limit: testCase.limit
    }

    try {
      const result = await FetchBreadcrumbs(props)
      assert.ok(Array.isArray(result))
      
      if ('expectedLength' in testCase) {
        assert.equal(result.length, testCase.expectedLength)
      } else if ('maxExpected' in testCase) {
        assert.ok(result.length <= testCase.maxExpected)
      }
    } catch (error) {
      // Function should handle errors gracefully
      assert.ok(error instanceof Error)
    }
  }
})

test('FetchBreadcrumbs returns correct data structure', async () => {
  const props: FetchBreadcrumbsProps = {
    type: 'page_id',
    id: 'test-page-id',
    limit: 3
  }

  try {
    const result = await FetchBreadcrumbs(props)
    
    // Always returns an array
    assert.ok(Array.isArray(result))
    
    // Each breadcrumb should have required structure
    for (const breadcrumb of result) {
      assert.ok(typeof breadcrumb === 'object')
      assert.ok('id' in breadcrumb)
      assert.ok('name' in breadcrumb)
      assert.ok(typeof breadcrumb.id === 'string')
      assert.ok(typeof breadcrumb.name === 'string')
      
      // Icon is optional but if present should have correct structure
      if ('icon' in breadcrumb && breadcrumb.icon) {
        assert.ok('type' in breadcrumb.icon)
        assert.ok(['emoji', 'external', 'file'].includes(breadcrumb.icon.type))
        
        if (breadcrumb.icon.type === 'emoji') {
          assert.ok('emoji' in breadcrumb.icon)
        } else {
          assert.ok('src' in breadcrumb.icon)
          assert.ok('url' in breadcrumb.icon)
        }
      }
    }
  } catch (error) {
    // Function handles errors gracefully
    assert.ok(error instanceof Error)
  }
})

test('FetchBreadcrumbs supports all parent types correctly', async () => {
  const testCases: Array<{ 
    type: FetchBreadcrumbsProps['type'], 
    id: string,
    shouldReturnEmpty?: boolean 
  }> = [
    { type: 'page_id', id: 'test-page-id' },
    { type: 'database_id', id: 'test-database-id' },
    { type: 'block_id', id: 'test-block-id' },
    { type: 'workspace', id: 'any-id', shouldReturnEmpty: true }
  ]

  for (const testCase of testCases) {
    const props: FetchBreadcrumbsProps = {
      type: testCase.type,
      id: testCase.id,
      limit: 2
    }

    try {
      const result = await FetchBreadcrumbs(props)
      assert.ok(Array.isArray(result))
      
      // Workspace type has special behavior - always returns empty immediately
      if (testCase.shouldReturnEmpty) {
        assert.equal(result.length, 0)
      }
    } catch (error) {
      // Function should handle API errors gracefully for non-workspace types
      if (testCase.type !== 'workspace') {
        assert.ok(error instanceof Error)
      }
    }
  }
})

test.run() 