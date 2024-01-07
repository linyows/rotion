import type { ListBlockChildrenResponseEx } from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link, ExternalModules } from '../types'

export interface PageProps {
  blocks: ListBlockChildrenResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  modules?: ExternalModules
}

export interface ListType {
  [key: string]: string
}
