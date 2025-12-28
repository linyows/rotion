import type { ChildDatabaseBlockObjectResponseEx } from '../../../../exporter/index.js'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types.js'

export interface ChildDatabaseBlockProps {
  block: ChildDatabaseBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

export interface ChildDatabaseLinkProps extends ChildDatabaseBlockProps {
  children: React.ReactNode
}
