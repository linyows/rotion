import type { JSX } from 'react'
import type { Link } from '../../types.js'
import type { BlockObjectResponse } from '../../../../exporter/index.js'
import type { ParsedUrlQueryInput } from 'node:querystring'

export interface ListBlocksProps {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
