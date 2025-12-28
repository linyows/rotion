import type { ParsedUrlQueryInput } from 'node:querystring'
import type { ReactNode } from 'react'
import type { Link } from '../../types.js'

export interface LinkedTagIfLinkedProps {
  pathname?: string
  link?: Link
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
