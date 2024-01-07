import type { ReactNode } from 'react'
import type { TextRichTextItemResponse } from 'notionate-pages'

export interface TextProps {
  textObject: TextRichTextItemResponse
  children?: ReactNode
}
