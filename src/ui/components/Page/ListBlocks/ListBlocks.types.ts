import type { ParsedUrlQueryInput } from 'node:querystring'
import type { JSX } from 'react'
import type { BlockObjectResponse } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface ListBlocksProps {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
