import React from 'react'
import ListHandler from './ListHandler'
import { getLinkPathAndLinkKey } from '../lib'
import type { GetPageResponse } from '../../../exporter'
import type { ColumnProps } from './Column.types'

function getSlug (key: string, page: GetPageResponse) {
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

const Column = ({ name, page, href, link, query }: ColumnProps) => {
  const [path, slugKey] = getLinkPathAndLinkKey(href)

  if (name === 'spacer' || name === 'dashed' || !('property_items' in page) || !('properties' in page)) {
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

  return <ListHandler name={name} items={items} path={path} slug={slug} link={link} query={query} />
}

export default Column
