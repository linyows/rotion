import type { DatabaseProperty } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface TableHandlerProps {
  property: DatabaseProperty
  options?: TablePropertyOptions
}

export interface TablePropertyOptions {
  pathname?: string
  link?: Link
  query?: ParsedUrlQueryInput
  suffix?: string
  prefix?: string
}
