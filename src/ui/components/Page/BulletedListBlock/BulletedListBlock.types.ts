import type { BulletedListItemBlockObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface BulletedListBlockProps {
  block: BulletedListItemBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
