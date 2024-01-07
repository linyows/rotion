import type { GetPagePropertyResponse } from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface TableHandlerProps {
  name: string
  items: GetPagePropertyResponse|undefined
  path?: string
  slug?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
