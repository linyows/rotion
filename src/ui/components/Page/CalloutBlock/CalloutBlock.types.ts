import type { CalloutBlockObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface CalloutBlockProps {
  block: CalloutBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
