import type { ParsedUrlQueryInput } from 'node:querystring'
import type { JSX } from 'react'
import type {
  DividerBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponseEx,
  QuoteBlockObjectResponseEx,
} from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface TextBlockProps {
  tag: keyof JSX.IntrinsicElements
  block:
    | ParagraphBlockObjectResponseEx
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
    | QuoteBlockObjectResponseEx
    | DividerBlockObjectResponse
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
