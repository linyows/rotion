import type { ReactNode } from 'react'
import type { QueryDatabaseResponseEx } from '../../../exporter/index.js'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types.js'

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
  verticalLines?: boolean
}
