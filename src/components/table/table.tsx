import React from 'react'
import type {
  QueryDatabaseResponseEx,
  GetPageResponse,
  PageObjectResponseEx,
  Link,
} from '../../server/types'
import TableHandler from './handler'
import TableIcon from './icon'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type TableProps = React.PropsWithChildren & {
  keys: string[]
  db: QueryDatabaseResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

const TablePropertyNameAndIcon: React.FC<{ name: string, db: QueryDatabaseResponseEx }> = ({ name, db }) => {
  if (!(name in db.meta.properties)) {
    return (
      <>
        {`Unknown "${name}"`}
      </>
    )
  }
  const propType = db.meta.properties[name].type
  return (
    <div className="notionate-table-cell-inner">
      <TableIcon type={propType} />
      <div className="notionate-table-cell-text">
        {name}
      </div>
    </div>
  )
}

export const Table: React.FC<TableProps> = ({ keys, db, href, link, query }) => {
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

  const [path, slugKey] = href ? getLinkPathAndLinkKey(href) : [undefined, undefined]

  const dbf = (name: string, page: PageObjectResponseEx) => {
    if (!('property_items' in page) || !('properties' in page)) {
      return <></>
    }
    let propertyId = ''
    for (const [k, v] of Object.entries(page.properties)) {
      if (k === name) {
        propertyId = v.id
      }
    }
    const items = page.property_items.find(v => ((v.object === 'property_item' && v.id === propertyId) || (v.object === 'list' && v.property_item.id === propertyId)))
    const slug = slugKey ? getSlug(slugKey, page) : undefined

    return TableHandler({ name, items, path, slug, link, query })
  }

  return (
    <div className="notionate-table">
      <div className="notionate-table-inner">
        <div className="notionate-table-header notionate-table-row">
          {keys.map((name, i) => (
            <div key={`${name}-${i}`} className={`notionate-table-cell notionate-table-column-${i}`}>
              <TablePropertyNameAndIcon name={name} db={db} />
            </div>
          ))}
        </div>
        {db.results.map((v) => (
          <div key={v.id} className="notionate-table-row">
            {keys.map((name, i) => (
              <div key={`${v.id}${name}`} className={`notionate-table-cell notionate-table-column-${i}`}>
                <div className="notionate-table-cell-inner">
                  {dbf(name, v as PageObjectResponseEx)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Table
