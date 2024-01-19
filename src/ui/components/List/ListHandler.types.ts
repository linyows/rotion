import type { GetPagePropertyResponse } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface ListHandlerProps {
  name: string
  items: GetPagePropertyResponse|undefined
  path: string
  slug: string
  link?: Link
  query?: ParsedUrlQueryInput
}
