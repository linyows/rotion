import React from 'react'
import ListHandler from './ListHandler'
import { getLinkPathAndLinkKey } from '../lib'
import type { DatabaseProperty, GetPageResponse } from '../../../exporter'
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

  if (name === 'spacer' || name === 'dashed' || !('properties' in page)) {
    return <></>
  }
  const slug = getSlug(slugKey, page)
  const property = page.properties[name]
  if (!property) {
    return <></>
  }

  return <ListHandler property={property as unknown as DatabaseProperty} path={path} slug={slug} link={link} query={query} />
}

export default Column
