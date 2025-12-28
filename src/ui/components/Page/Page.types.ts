import type { ListBlockChildrenResponseEx } from '../../../exporter/index.js'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types.js'

export interface PageProps {
  blocks: ListBlockChildrenResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  breadcrumb_hrefs?: string[]
}

export interface ListType {
  [key: string]: string
}

export type ULOL = 'ul' | 'ol'
