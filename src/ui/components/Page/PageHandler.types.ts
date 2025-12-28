import type { BlockObjectResponse } from '../../../exporter/index.js'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types.js'

export interface HandlerProps {
  block: BlockObjectResponse
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  breadcrumb_hrefs?: string[]
}
