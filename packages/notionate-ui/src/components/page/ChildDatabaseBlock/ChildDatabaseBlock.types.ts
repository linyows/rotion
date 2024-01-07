import type { ChildDatabaseBlockObjectResponseEx } from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface ChildDatabaseBlockProps {
  block: ChildDatabaseBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
