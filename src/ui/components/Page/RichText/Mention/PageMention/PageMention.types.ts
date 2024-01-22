import type { ReactNode } from 'react'
import { PageOrDatabaseMention } from '../../../../../../exporter'

export interface PageMentionProps {
  mention: PageOrDatabaseMention
  children?: ReactNode
}
