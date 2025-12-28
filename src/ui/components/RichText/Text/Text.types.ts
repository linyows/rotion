import type { ReactNode } from 'react'
import type { RichTextItemResponse } from '../../../../exporter/index.js'

export interface TextProps {
  textObject: RichTextItemResponse
  children?: ReactNode
}
