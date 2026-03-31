import { notion, reqAPIWithBackoffAndCache } from './api.js'
import { savePageIcon, getNotionIconUrl } from './page.js'
import { saveDatabaseIcon } from './database.js'
import type {
  GetBlockResponse,
  GetPageResponseEx,
  GetDatabaseResponseEx,
  Parent,
  Breadcrumb,
} from './types.js'

export interface FetchBreadcrumbsProps {
  type: 'page_id' | 'database_id' | 'block_id' | 'workspace' | 'data_source_id'
  id: string
  limit?: number
}

export const FetchBreadcrumbs = async ({ type, id, limit }: FetchBreadcrumbsProps): Promise<Breadcrumb[]> => {
  let breadcrumbs: Breadcrumb[] = []
  const max = limit === undefined ? 5 : limit
  let count = 0
  let nextType = type
  let nextID = id
  let isNext = true

  const getID = (parent: Parent) => {
    switch (parent.type) {
      case 'block_id':
        return parent.block_id
      case 'page_id':
        return parent.page_id
      case 'database_id':
        return parent.database_id
      case 'data_source_id':
        return parent.data_source_id
      case 'workspace':
        isNext = false
        return ''
    }
  }

  try {
    while (count < max && isNext) {
      switch (nextType) {
        case 'block_id': {
          const res = await reqAPIWithBackoffAndCache<GetBlockResponse>({
            name: 'notion.blocks.retrieve',
            func: notion.blocks.retrieve,
            args: { block_id: nextID },
            count: 3,
          })
          if ('parent' in res) {
            nextType = res.parent.type
            nextID = getID(res.parent)
          } else {
            isNext = false
          }
          break
        }
        case 'page_id': {
          const page = await reqAPIWithBackoffAndCache<GetPageResponseEx>({
            name: 'notion.pages.retrieve',
            func: notion.pages.retrieve,
            args: { page_id: nextID },
            count: 3,
          })
          await savePageIcon(page)

          nextType = page.parent.type
          nextID = getID(page.parent)
          const name = page.properties.title.type === 'title' ? page.properties.title.title.map(v => v.plain_text).join('') : ''
          const breadcrumb: Breadcrumb = { id: page.id, name }
          if (page.icon?.type === 'emoji') {
            breadcrumb.icon = {
              type: page.icon.type,
              emoji: page.icon.emoji,
            }
          } else if (page.icon?.type === 'external' || page.icon?.type === 'file') {
            breadcrumb.icon = {
              type: page.icon.type,
              src: page.icon.src,
              url: page.icon.type === 'external' ? page.icon.external.url : page.icon.file.url,
            }
          } else if (page.icon?.type === 'icon') {
            const url = getNotionIconUrl(page.icon.icon)
            breadcrumb.icon = {
              type: 'external',
              src: page.icon.src,
              url,
            }
          }
          breadcrumbs.unshift(breadcrumb)
          count++
          break
        }
        case 'database_id': {
          const db = await reqAPIWithBackoffAndCache<GetDatabaseResponseEx>({
            name: 'notion.database.retrieve',
            func: notion.databases.retrieve,
            args: { database_id: nextID },
            count: 3,
          })
          await saveDatabaseIcon(db)

          nextType = db.parent.type
          nextID = getID(db.parent)
          const name = db.title.map(v => v.plain_text).join('')
          const breadcrumb: Breadcrumb = { id: db.id, name }
          if (db.icon?.type === 'emoji') {
            breadcrumb.icon = {
              type: db.icon.type,
              emoji: db.icon.emoji,
            }
          } else if (db.icon?.type === 'external' || db.icon?.type === 'file') {
            breadcrumb.icon = {
              type: db.icon.type,
              src: db.icon.src,
              url: db.icon.type === 'external' ? db.icon.external.url : db.icon.file.url,
            }
          } else if (db.icon?.type === 'icon') {
            const url = getNotionIconUrl(db.icon.icon)
            breadcrumb.icon = {
              type: 'external',
              src: db.icon.src,
              url,
            }
          }
          breadcrumbs.unshift(breadcrumb)
          count++
          break
        }
        case 'data_source_id':
          // Data sources don't have breadcrumbs themselves
          // We would need to get the parent database instead
          isNext = false
          break
        case 'workspace':
          isNext = false
          break
      }
    }
  } catch (e) {
    // console.log(`breadcrumbs error: ${e}`)
  }

  return breadcrumbs
}
