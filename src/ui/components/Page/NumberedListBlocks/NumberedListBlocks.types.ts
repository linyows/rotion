import type { NumberedListItemBlockObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface NumberedListBlocksProps {
  block: NumberedListItemBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
