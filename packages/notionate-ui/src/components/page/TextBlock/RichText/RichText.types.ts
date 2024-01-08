import type { ReactNode } from 'react'
import type { RichTextItemResponse } from 'notionate-pages'

export interface RichTextProps {
  textObject?: RichTextItemResponse
  key?: string
  children?: ReactNode
}
