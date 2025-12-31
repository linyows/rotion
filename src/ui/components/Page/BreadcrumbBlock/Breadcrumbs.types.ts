import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Breadcrumb } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface BreadcrumbsProps {
  list: Breadcrumb[]
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}
