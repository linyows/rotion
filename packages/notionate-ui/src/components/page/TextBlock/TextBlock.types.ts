import type { RichTextItemResponse } from 'notionate-pages'

export interface TextBlockProps {
  tag: keyof JSX.IntrinsicElements
  block: RichTextItemResponse[] | undefined
}
