import React from 'react'
import type { PageObjectResponseEx } from '../../../exporter'
import TableHandler from './TableHandler'
import { getLinkPathAndLinkKey } from '../lib'
import type { ColumnProps } from './Column.types'

const Column = ({ name, page, href, link, query }: ColumnProps) => {
  const getSlug = (name: string, page: PageObjectResponseEx): string => {
    if (!('properties' in page)) {
      return 'not-found-properties'
    }
    if (name === 'id') {
      return page.id
    }
    if (!(name in page.properties)) {
      return 'not-found-key-in-page-properties'
    }
    const p = page.properties[name]
    if (!('rich_text' in p)) {
      return 'not-found-richtext-in-key'
    }
    // @ts-ignore
    return p.rich_text.map(v => v.text.content).join(',')
  }

  const [path, slugKey] = href ? getLinkPathAndLinkKey(href) : [undefined, undefined]

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

  return <TableHandler items={items} path={path} slug={slug} link={link} query={query} />
}

export default Column
