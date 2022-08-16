import React from 'react'
import type {
  QueryDatabaseResponseEx,
  GetPageResponse,
  PageObjectResponseEx,
  DBProperties,
} from '../../types'
import DBField from './field'

export type DBListProps = {
  keys: string[]
  db: QueryDatabaseResponseEx
  link: string
}

export const DBList: React.FC<DBListProps> = ({ keys, db, link }) => {
  const getLinkPathAndLinkKey = (link: string): [string, string] => {
    const linkArray = link.split('[')
    if (linkArray.length !== 2) {
      console.log(`link format is wrong, example: /blog/path/[slug]`)
      return ['', '']
    }
    return [linkArray[0], linkArray[1].split(']')[0]]
  }

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
    return DBField({ name, items, path, slug })
  }

  return (
    <>
      {db.results.map((v) => (
        <div key={v.id} className="record">
          {keys.map((name, i) => (
            <div key={`${v.id}${name}`} className={`${name === 'spacer' ? 'spacer ' : ''}field${i}`}>
              {dbf(name, v as PageObjectResponseEx)}
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        .record {
          display: flex;
          margin: 4px 0;
          padding: 4px 0;
          user-select: none;
          transition: background 20ms ease-in 0s;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }
        .record:hover {
          background-color: #DDD;
        }
        .spacer {
          width: 100%;
          flex-shrink: 10;
          display: block;
          margin-left: 14px;
          border-top: 1px dashed #999;
        }
      `}</style>
    </>
  )
}

export default DBList
