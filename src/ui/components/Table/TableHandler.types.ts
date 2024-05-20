import type { DatabaseProperty } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface TableHandlerProps {
  property: DatabaseProperty
  path?: string
  slug?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
