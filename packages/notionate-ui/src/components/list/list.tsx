import React from 'react'
import { Link } from '../types'
import type {
  QueryDatabaseResponseEx,
  GetPageResponse,
  PageObjectResponseEx,
} from 'notionate-pages'
import ListHandler from './handler'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type ListProps = React.PropsWithChildren & {
  keys: string[]
  db: QueryDatabaseResponseEx
  href: string
  link?: Link
  query?: ParsedUrlQueryInput
}

export const List: React.FC<ListProps> = ({ keys, db, href, link, query }) => {
  const getSlug = (key: string, page: GetPageResponse): string => {
    if (!('properties' in page)) {
      return 'not-found-properties'
    }
    if (key === 'id') {
      return page.id
    }
    if (!(key in page.properties)) {
      return 'not-found-key-in-page-properties'
    }
    const p = page.properties[key]
    if (!('rich_text' in p)) {
      return 'not-found-richtext-in-key'
    }
    // @ts-ignore
    return p.rich_text.map(v => v.text.content).join(',')
  }

  const [path, slugKey] = getLinkPathAndLinkKey(href)

  const dbf = (name: string, page: PageObjectResponseEx) => {
    if (name === 'spacer' || !('property_items' in page) || !('properties' in page)) {
      return <></>
    }
    let propertyId = ''
    for (const [k, v] of Object.entries(page.properties)) {
      if (k === name) {
        propertyId = v.id
      }
    }
    const items = page.property_items.find(v => ((v.object === 'property_item' && v.id === propertyId) || (v.object === 'list' && v.property_item.id === propertyId)))
    const slug = getSlug(slugKey, page)

    return ListHandler({ name, items, path, slug, link, query })
  }

  return (
    <div className="notionate-list">
      <div className="notionate-list-inner">
        {db.results.map((v) => (
          <div key={v.id} className="notionate-list-record">
            {keys.map((name, i) => (
              <div key={`${v.id}${name}`} className={`${name === 'spacer' ? 'notionate-list-spacer ' : ''}field${i}`}>
                {dbf(name, v as PageObjectResponseEx)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
