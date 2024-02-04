import type { ReactNode } from 'react'
import type { Link } from '../../types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export interface LinkedTagIfLinkedProps {
  pathname: string
  color: string
  link?: Link
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
