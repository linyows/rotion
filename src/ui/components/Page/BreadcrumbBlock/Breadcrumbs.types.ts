import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'
import type { Breadcrumb } from '../../../../exporter'

export interface BreadcrumbsProps {
  list: Breadcrumb[]
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}
