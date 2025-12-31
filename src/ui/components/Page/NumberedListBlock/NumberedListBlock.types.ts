import type { ParsedUrlQueryInput } from 'node:querystring'
import type { NumberedListItemBlockObjectResponseEx } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface NumberedListBlockProps {
  block: NumberedListItemBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
