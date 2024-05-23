import type { ReactNode } from 'react'
import type { QueryDatabaseResponseEx } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface TableProps {
  keys: string[]
  db: QueryDatabaseResponseEx
  children?: ReactNode
  options?: TableOptions
}

export interface TableOptions {
  href?: { [key: string]: string }
  link?: Link
  query?: ParsedUrlQueryInput
  prefix?: { [key: string]: string }
  suffix?: { [key: string]: string }
}
