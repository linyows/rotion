import type { ReactNode } from 'react'
import type { MentionRichTextItemResponseEx } from '../../../../exporter/index.js'

export interface MentionProps {
  textObject?: MentionRichTextItemResponseEx
  children?: ReactNode
}
