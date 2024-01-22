import type { ReactNode } from 'react'
import type { MentionRichTextItemResponseEx } from '../../../../../exporter'

export interface MentionProps {
  textObject?: MentionRichTextItemResponseEx
  children?: ReactNode
}
