import React from 'react'
import ListHandler from './ListHandler'
import { getLinkPathAndLinkKey, getSlug } from '../lib'
import type { DatabaseProperty } from '../../../exporter'
import type { ColumnProps } from './Column.types'
import type { ListPropertyOptions } from './ListHandler.types'

const Column = ({ name, page, options }: ColumnProps) => {
  if (name === 'spacer' || name === 'dashed' || !('properties' in page)) {
    return <></>
  }
  const property = page.properties[name]
  if (!property) {
    return <></>
  }

  let opts: ListPropertyOptions = {}

  if (options?.href && options?.href[name]) {
    const [path, slugKey] = getLinkPathAndLinkKey(options.href[name])
    opts.pathname = (slugKey === '') ? path : `${path}${getSlug(slugKey, page)}`
  }
  if (options?.prefix && options.prefix[name]) {
    opts.prefix = options.prefix[name]
  }
  if (options?.suffix && options.suffix[name]) {
    opts.suffix = options.suffix[name]
  }

  return <ListHandler property={property as unknown as DatabaseProperty} options={opts} />
}

export default Column
