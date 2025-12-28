import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types.js'
import type { Breadcrumb } from '../../../../exporter/index.js'

export interface BreadcrumbsProps {
  list: Breadcrumb[]
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}
