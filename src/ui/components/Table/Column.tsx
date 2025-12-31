import type { DatabaseProperty } from '../../../exporter/index.js'
import { getLinkPathAndLinkKey, getSlug } from '../lib.js'
import type { ColumnProps } from './Column.types'
import TableHandler from './TableHandler.js'
import type { TablePropertyOptions } from './TableHandler.types'

const Column = ({ name, page, options }: ColumnProps) => {
  if (!('properties' in page)) {
    return null
  }

  const property = page.properties[name]
  if (!property) {
    return null
  }

  const { href, link, query, prefix, suffix } = options || {}
  const opts: TablePropertyOptions = {}

  if (href?.[name]) {
    const [path, slugKey] = getLinkPathAndLinkKey(href[name])
    opts.pathname = slugKey === '' ? path : `${path}${getSlug(slugKey, page)}`
    if (link) {
      opts.link = link
    }
    if (query) {
      opts.query = query
    }
  }
  if (prefix?.[name]) {
    opts.prefix = prefix[name]
  }
  if (suffix?.[name]) {
    opts.suffix = suffix[name]
  }

  return <TableHandler property={property as unknown as DatabaseProperty} options={opts} />
}

export default Column
