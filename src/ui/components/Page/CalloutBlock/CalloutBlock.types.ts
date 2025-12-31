import type { ParsedUrlQueryInput } from 'node:querystring'
import type { CalloutBlockObjectResponseEx } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface CalloutBlockProps {
  block: CalloutBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
