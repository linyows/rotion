import type { ParsedUrlQueryInput } from 'node:querystring'
import type { BreadcrumbBlockObjectResponseEx } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface BreadcrumbBlockProps {
  block: BreadcrumbBlockObjectResponseEx
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}
