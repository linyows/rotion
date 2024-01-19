import type { RichTextItemResponse } from '../../../../exporter'

export interface TextBlockProps {
  tag: keyof JSX.IntrinsicElements
  block: RichTextItemResponse[] | undefined
}
