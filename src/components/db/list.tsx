import React from 'react'
import type {
  QueryDatabaseResponseEx,
  GetPageResponse,
  PageObjectResponseEx,
} from '../../server/types'
import ListHandler from './handler'
import { getLinkPathAndLinkKey } from '../lib/linkpath'

export type DBListProps = React.PropsWithChildren & {
  keys: string[]
  db: QueryDatabaseResponseEx
  link: string
}

export const DBList: React.FC<DBListProps> = ({ keys, db, link }) => {
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

  const [path, slugKey] = getLinkPathAndLinkKey(link)

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
    const items = page.property_items.find(v => {
      if (v.type === 'property_item') {
        if (v.results[0].id === propertyId) {
          return true
        }
      } else {
        if (v.id === propertyId) {
          return true
        }
      }
      return false
    })
    const slug = getSlug(slugKey, page)

    return ListHandler({ name, items, path, slug })
  }

  return (
    <div className="notionate">
      {db.results.map((v) => (
        <div key={v.id} className="notionate-db-list-record">
          {keys.map((name, i) => (
            <div key={`${v.id}${name}`} className={`${name === 'spacer' ? 'notionate-db-list-spacer ' : ''}field${i}`}>
              {dbf(name, v as PageObjectResponseEx)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DBList
