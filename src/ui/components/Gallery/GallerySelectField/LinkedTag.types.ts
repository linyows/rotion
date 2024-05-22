import type { ParsedUrlQueryInput } from 'node:querystring'
import type { ReactNode } from 'react'
import type { Link } from '../../types'

export interface LinkedTagIfLinkedProps {
  pathname?: string
  link?: Link
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
