import type { ParsedUrlQueryInput } from 'node:querystring'
import type { ColumnListBlockObjectResponseEx } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface ColumnListBlockProps {
  block: ColumnListBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
