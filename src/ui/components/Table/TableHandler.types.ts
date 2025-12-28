import type { DatabaseProperty } from '../../../exporter/index.js'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types.js'

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
