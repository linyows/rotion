import type { DatabaseProperty } from '../../../exporter/index.js'
import { getLinkPathAndLinkKey, getSlug } from '../lib.js'
import type { ColumnProps } from './Column.types'
import ListHandler from './ListHandler.js'
import type { ListPropertyOptions } from './ListHandler.types'

const Column = ({ name, page, options }: ColumnProps) => {
  if (name === 'spacer' || name === 'dashed' || !('properties' in page)) {
    return null
  }
  const property = page.properties[name]
  if (!property) {
    return null
  }

  const { href, prefix, suffix, link, query } = options || {}
  const opts: ListPropertyOptions = { link, query }

  if (href?.[name]) {
    const [path, slugKey] = getLinkPathAndLinkKey(href[name])
    opts.pathname = slugKey === '' ? path : `${path}${getSlug(slugKey, page)}`
  }
  if (prefix?.[name]) {
    opts.prefix = prefix[name]
  }
  if (suffix?.[name]) {
    opts.suffix = suffix[name]
  }

  return <ListHandler property={property as unknown as DatabaseProperty} options={opts} />
}

export default Column
