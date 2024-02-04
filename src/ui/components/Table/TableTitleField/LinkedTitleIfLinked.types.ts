import type { ReactNode } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface LinkedTitleIfLinkedProps {
  path?: string
  slug?: string
  link?: Link
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
