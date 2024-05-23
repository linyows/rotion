import React from 'react'
import type { DatabaseProperty, PageObjectResponseEx } from '../../../exporter'
import TableHandler from './TableHandler'
import { getLinkPathAndLinkKey, getSlug } from '../lib'
import type { ColumnProps } from './Column.types'

const Column = ({ name, page, href, link, query }: ColumnProps) => {
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
