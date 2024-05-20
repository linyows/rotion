import React from 'react'
import type { DatabaseProperty, PageObjectResponseEx } from '../../../exporter'
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

  if (!('properties' in page)) {
    return <></>
  }

  const slug = slugKey ? getSlug(slugKey, page) : undefined
  const property = page.properties[name]
  if (!property) {
    return <></>
  }

  return <TableHandler property={property as unknown as DatabaseProperty} path={path} slug={slug} link={link} query={query} />
}

export default Column
