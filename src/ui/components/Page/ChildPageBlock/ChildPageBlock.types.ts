import type { ChildPageBlockObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface ChildPageBlockProps {
  block: ChildPageBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

export interface ChildPageLinkProps extends ChildPageBlockProps {
  children: React.ReactNode
}
