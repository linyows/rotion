import type { ListBlockChildrenResponseEx } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link, ExternalModules } from '../types'

export interface PageProps {
  blocks: ListBlockChildrenResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  modules?: ExternalModules
  breadcrumb_hrefs?: string[]
}

export interface ListType {
  [key: string]: string
}

export type ULOL = 'ul' | 'ol'
