import type { JSX } from 'react'
import type {
  DividerBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponseEx,
  QuoteBlockObjectResponse,
} from '../../../../exporter/index.js'

export interface TextBlockProps {
  tag: keyof JSX.IntrinsicElements
  block:
    | ParagraphBlockObjectResponseEx
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
    | QuoteBlockObjectResponse
    | DividerBlockObjectResponse
}
