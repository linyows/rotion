import type { Link } from '../../types'
import type { BlockObjectResponse } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'

export interface ListBlockProps {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
