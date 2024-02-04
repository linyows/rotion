import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'
import type { BreadcrumbBlockObjectResponseEx } from '../../../../exporter'

export interface BreadcrumbBlockProps {
  block: BreadcrumbBlockObjectResponseEx
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}
