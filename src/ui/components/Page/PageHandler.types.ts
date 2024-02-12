import type { BlockObjectResponse } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface HandlerProps {
  block: BlockObjectResponse
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  breadcrumb_hrefs?: string[]
}
