import type { ReactNode } from 'react'
import type { TextRichTextItemResponse } from '../../../../exporter'

export interface TextProps {
  textObject: TextRichTextItemResponse
  children?: ReactNode
}
