import type { ParsedUrlQueryInput } from 'node:querystring'
import type { DatabaseProperty } from '../../../exporter'
import type { ListOptions } from './List.types'
import type { Link } from '../types'

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
