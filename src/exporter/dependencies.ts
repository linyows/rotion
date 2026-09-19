import { AsyncLocalStorage } from 'node:async_hooks'
import { notion, reqAPIWithBackoffAndCache } from './api.js'
import type {
  Dependency,
  GetBlockResponse,
  GetPageResponseEx,
  GetDatabaseResponseEx,
} from './types.js'

const collectors = new AsyncLocalStorage<Map<string, Dependency>>()

/**
 * recordDependency adds a dependency to the result that is being fetched.
 */
export function recordDependency (dependency: Dependency): void {
  collectors.getStore()?.set(`${dependency.type}:${dependency.id}`, dependency)
}

/**
 * recordDependencies adds the dependencies of a result that came from the
 * cache, so that a result which contains it depends on them too.
 */
export function recordDependencies (dependencies: Dependency[] | undefined): void {
  for (const dependency of dependencies ?? []) {
    recordDependency(dependency)
  }
}

/**
 * collectDependencies runs fn and returns the dependencies recorded while it
 * ran, including in nested calls. They are passed on to the caller's
 * collector as well: the result of a nested FetchBlocks is copied into its
 * parent's result, so the parent depends on the same pages.
 */
export async function collectDependencies<T> (fn: () => Promise<T>): Promise<{ value: T, dependencies: Dependency[] }> {
  const collector = new Map<string, Dependency>()
  const value = await collectors.run(collector, fn)
  const parent = collectors.getStore()
  for (const [key, dependency] of collector) {
    parent?.set(key, dependency)
  }
  return { value, dependencies: [...collector.values()] }
}

/**
 * editedTimeOf returns the current last_edited_time of a page or database.
 * The response is cached for ROTION_CACHE_AVAILABLE_DURATION, so checking
 * the same dependency again and again costs one request in that period.
 */
export async function editedTimeOf (type: Dependency['type'], id: string): Promise<string> {
  if (type === 'page') {
    const page = await reqAPIWithBackoffAndCache<GetPageResponseEx>({
      name: 'notion.pages.retrieve',
      func: notion().pages.retrieve,
      args: { page_id: id },
      count: 3,
    })
    return page.last_edited_time
  }
  const db = await reqAPIWithBackoffAndCache<GetDatabaseResponseEx>({
    name: 'notion.databases.retrieve',
    func: notion().databases.retrieve,
    args: { database_id: id },
    count: 3,
  })
  return db.last_edited_time
}

/**
 * isAnyDependencyChanged tells whether a dependency has been edited since it
 * was recorded. A dependency that can no longer be retrieved counts as
 * changed, so that the result is fetched again and shows the failure.
 */
export async function isAnyDependencyChanged (dependencies: Dependency[] | undefined): Promise<boolean> {
  for (const dependency of dependencies ?? []) {
    try {
      if (await editedTimeOf(dependency.type, dependency.id) !== dependency.last_edited_time) {
        return true
      }
    } catch {
      return true
    }
  }
  return false
}

/**
 * pageOfBlock returns the id of the page a block is in, following the
 * parents of nested blocks. It returns undefined for a block that is not in
 * a page, or one nested deeper than the limit.
 */
export async function pageOfBlock (block_id: string, limit = 20): Promise<string | undefined> {
  let id = block_id
  for (let i = 0; i < limit; i++) {
    const block = await reqAPIWithBackoffAndCache<GetBlockResponse>({
      name: 'notion.blocks.retrieve',
      func: notion().blocks.retrieve,
      args: { block_id: id },
      count: 3,
    })
    if (!('parent' in block)) {
      return undefined
    }
    if (block.parent.type === 'page_id') {
      return block.parent.page_id
    }
    if (block.parent.type !== 'block_id') {
      return undefined
    }
    id = block.parent.block_id
  }
  return undefined
}
