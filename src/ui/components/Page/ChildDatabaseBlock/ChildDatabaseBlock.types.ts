import type { ChildDatabaseBlockObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface ChildDatabaseBlockProps {
  block: ChildDatabaseBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

export interface ChildDatabaseLinkProps extends ChildDatabaseBlockProps {
  children: React.ReactNode
}
