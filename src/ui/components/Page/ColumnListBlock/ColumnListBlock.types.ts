import type { ColumnListBlockObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface ColumnListBlockProps {
  block: ColumnListBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
