import type { ParsedUrlQueryInput } from 'node:querystring'
import type { QueryDatabaseResponseEx } from '../../../exporter/index.js'
import type { Link } from '../types.js'

export interface CalendarProps {
  keys: string[]
  date: string
  db: QueryDatabaseResponseEx
  options?: CalendarOptions
}

export interface CalendarOptions {
  href?: { [key: string]: string }
  link?: Link
  query?: ParsedUrlQueryInput
  initialDate?: string
  weekStart?: 'sunday' | 'monday'
  locale?: string
}
