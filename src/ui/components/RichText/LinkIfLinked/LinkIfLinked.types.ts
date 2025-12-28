import type { ReactNode } from 'react'
import type { RichTextItemResponse } from '../../../../exporter/index.js'

export interface TextLinkProps {
  textObject: RichTextItemResponse
  key?: string
  children?: ReactNode
}

export interface LinkIfLinkedProps {
  condition: boolean
  textObject: RichTextItemResponse
  children: ReactNode
}
