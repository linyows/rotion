import type { ParsedUrlQueryInput } from 'node:querystring'
import type { BulletedListItemBlockObjectResponseEx } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface BulletedListBlockProps {
  block: BulletedListItemBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
