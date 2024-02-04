import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface LinkedTitleProps {
  title: string
  href: string
  link?: Link
  query?: ParsedUrlQueryInput
}
