import type { ReactNode } from 'react'
import type { QueryDatabaseResponseEx } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface ListProps {
  keys: string[]
  db: QueryDatabaseResponseEx
  href: string
  link?: Link
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
