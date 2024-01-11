import type { ReactNode } from 'react'
import type { RichTextItemResponse, RichTextItemResponseEx } from 'notionate-pages'

export interface RichTextProps {
  textObject?: RichTextItemResponseEx | RichTextItemResponse
  key?: string
  children?: ReactNode
}
