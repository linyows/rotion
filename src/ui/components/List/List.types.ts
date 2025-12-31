import type { ParsedUrlQueryInput } from 'node:querystring'
import type { ReactNode } from 'react'
import type { QueryDatabaseResponseEx } from '../../../exporter/index.js'
import type { Link } from '../types.js'

export interface ListProps {
  keys: string[]
  db: QueryDatabaseResponseEx
  children?: ReactNode
  options?: ListOptions
}

export interface ListOptions {
  href?: { [key: string]: string }
  link?: Link
  query?: ParsedUrlQueryInput
  suffix?: { [key: string]: string }
  prefix?: { [key: string]: string }
}
