import type { ReactNode } from 'react'
import type { RichTextItemResponse, RichTextItemResponseEx } from '../../../../exporter'

export interface RichTextProps {
  textObject?: RichTextItemResponseEx | RichTextItemResponse
  key?: string
  children?: ReactNode
}
