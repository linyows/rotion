import { notion, reqAPIWithBackoffAndCache } from './api.js'
import { savePageIcon } from './page.js'
import { saveDatabaseIcon } from './database.js'
import type {
  GetBlockResponse,
  GetPageResponseEx,
  GetDatabaseResponseEx,
  MentionIcon,
  Parent,
} from './types.js'

export interface FetchBreadcrumbsProps {
  type: 'page_id' | 'database_id' | 'block_id' | 'workspace'
  id: string
  limit?: number
}

export type BreadcrumbsIcon = MentionIcon

export interface Breadcrumbs {
  name: string
  icon: BreadcrumbsIcon
}

export const FetchBreadcrumbs = async ({ type, id, limit }: FetchBreadcrumbsProps): Promise<Breadcrumbs[]> => {
  let breadcrumbs: Breadcrumbs[] = []
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
      case 'workspace':
        isNext = false
        return ''
    }
  }

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
          name: 'notion.page.retrieve',
          func: notion.pages.retrieve,
          args: { page_id: nextID },
          count: 3,
        })
        await savePageIcon(page)

        nextType = page.parent.type
        nextID = getID(page.parent)
        const name = page.properties.title.type === 'title' ? page.properties.title.title.map(v => v.plain_text).join('') : ''
        if (page.icon?.type === 'emoji') {
          breadcrumbs.unshift({
            name,
            icon: {
              type: page.icon.type,
              emoji: page.icon.emoji,
            }
          })
        } else if (page.icon?.type === 'external' || page.icon?.type === 'file') {
          const src = page.icon.type === 'external' ? page.icon.external.url : page.icon.file.url 
          breadcrumbs.unshift({
            name,
            icon: {
              type: page.icon.type,
              src,
              url: src,
            }
          })
        }
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
        if (db.icon?.type === 'emoji') {
          breadcrumbs.unshift({
            name,
            icon: {
              type: db.icon.type,
              emoji: db.icon.emoji,
            }
          })
        } else if (db.icon?.type === 'external' || db.icon?.type === 'file') {
          const src = db.icon.type === 'external' ? db.icon.external.url : db.icon.file.url 
          breadcrumbs.unshift({
            name,
            icon: {
              type: db.icon.type,
              src,
              url: src,
            }
          })
        }
        count++
        break
      }
      case 'workspace':
        isNext = false
        break
    }
  }

  return breadcrumbs
}
