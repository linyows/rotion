import type { ReactNode } from 'react'
import type { MentionRichTextItemResponseEx } from 'notionate-pages'

export interface MentionProps {
  textObject?: MentionRichTextItemResponseEx
  children?: ReactNode
}
