import type { ReactNode } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface LinkedTagIfLinkedProps {
  pathname: string
  color: string
  link?: Link
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
