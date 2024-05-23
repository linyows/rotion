import React from 'react'
import type { DatabaseProperty, PageObjectResponseEx } from '../../../exporter'
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

  let opts: TablePropertyOptions = {}

  if (options?.href && options?.href[name]) {
    const [path, slugKey] = getLinkPathAndLinkKey(options.href[name])
    opts.pathname = (slugKey === '') ? path : `${path}${getSlug(slugKey, page)}`
    if (options?.link) {
      opts.link = options.link
    }
    if (options?.query) {
      opts.query = options.query
    }
  }
  if (options?.prefix && options.prefix[name]) {
    opts.prefix = options.prefix[name]
  }
  if (options?.suffix && options.suffix[name]) {
    opts.suffix = options.suffix[name]
  }

  return <TableHandler property={property as unknown as DatabaseProperty} options={opts} />
}

export default Column
