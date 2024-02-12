import type { GetPagePropertyResponse } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface TableHandlerProps {
  items: GetPagePropertyResponse|undefined
  path?: string
  slug?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
