import type { BulletedListItemBlockObjectResponseEx } from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface BulletedListBlocksProps {
  block: BulletedListItemBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
