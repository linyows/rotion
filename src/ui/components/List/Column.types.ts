import type { PageObjectResponseEx } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface ColumnProps {
  name: string
  page: PageObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
