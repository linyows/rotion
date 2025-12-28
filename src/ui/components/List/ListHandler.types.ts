import type { ParsedUrlQueryInput } from 'node:querystring'
import type { DatabaseProperty } from '../../../exporter/index.js'
import type { Link } from '../types.js'

export interface ListHandlerProps {
  property: DatabaseProperty
  options?: ListPropertyOptions
}

export interface ListPropertyOptions {
  pathname?: string
  link?: Link
  query?: ParsedUrlQueryInput
  suffix?: string
  prefix?: string
}
