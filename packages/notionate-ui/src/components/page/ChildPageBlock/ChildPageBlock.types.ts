import type { ChildPageBlockObjectResponseEx } from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface ChildPageBlockProps {
  block: ChildPageBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
