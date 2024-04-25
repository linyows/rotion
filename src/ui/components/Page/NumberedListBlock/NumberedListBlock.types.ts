import type { NumberedListItemBlockObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface NumberedListBlockProps {
  block: NumberedListItemBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
