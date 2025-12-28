import type { ReactNode } from 'react'
import type { TextRichTextItemResponse } from '../../../../exporter/index.js'

export interface TextProps {
  textObject: TextRichTextItemResponse
  children?: ReactNode
}
