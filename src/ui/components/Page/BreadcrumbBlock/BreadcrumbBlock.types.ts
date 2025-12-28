import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types.js'
import type { BreadcrumbBlockObjectResponseEx } from '../../../../exporter/index.js'

export interface BreadcrumbBlockProps {
  block: BreadcrumbBlockObjectResponseEx
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}
