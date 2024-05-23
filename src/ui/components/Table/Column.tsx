import React from 'react'
import type { DatabaseProperty } from '../../../exporter'
import TableHandler from './TableHandler'
import { getLinkPathAndLinkKey, getSlug } from '../lib'
import type { ColumnProps } from './Column.types'
import type { TablePropertyOptions } from './TableHandler.types'

const Column = ({ name, page, options }: ColumnProps) => {
  if (!('properties' in page)) {
    return <></>
  }

  const property = page.properties[name]
  if (!property) {
    return <></>
  }

  const { href, link, query, prefix, suffix } = options || {}
  const opts: TablePropertyOptions = {}

  if (href && href[name]) {
    const [path, slugKey] = getLinkPathAndLinkKey(href[name])
    opts.pathname = (slugKey === '') ? path : `${path}${getSlug(slugKey, page)}`
    if (link) {
      opts.link = link
    }
    if (query) {
      opts.query = query
    }
  }
  if (prefix && prefix[name]) {
    opts.prefix = prefix[name]
  }
  if (suffix && suffix[name]) {
    opts.suffix = suffix[name]
  }

  return <TableHandler property={property as unknown as DatabaseProperty} options={opts} />
}

export default Column
