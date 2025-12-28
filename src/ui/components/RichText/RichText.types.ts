import type { ReactNode } from 'react'
import type { RichTextItemResponse, RichTextItemResponseEx } from '../../../exporter/index.js'

export interface RichTextProps {
  textObject?: RichTextItemResponseEx | RichTextItemResponse
  key?: string
  children?: ReactNode
}

export interface CaptionProps {
  type: 'embed' | 'video'
  caption: RichTextItemResponse[]
}
