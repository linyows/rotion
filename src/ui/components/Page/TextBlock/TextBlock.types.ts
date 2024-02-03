import type {
  ParagraphBlockObjectResponseEx,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  QuoteBlockObjectResponse,
  DividerBlockObjectResponse,
} from '../../../../exporter'

export interface TextBlockProps {
  tag: keyof JSX.IntrinsicElements
  block: ParagraphBlockObjectResponseEx
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
    | QuoteBlockObjectResponse
    | DividerBlockObjectResponse
}
