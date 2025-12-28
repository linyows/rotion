import type { ReactNode } from 'react'
import type {
  TableBlockObjectResponseEx,
  RichTextItemResponse,
} from '../../../../exporter/index.js'

export interface TableBlockProps {
  block: TableBlockObjectResponseEx
}

export interface TrProps {
  key: string
  children: ReactNode
}

export interface ThTdProps {
  richTexts: RichTextItemResponse[]
  key: string
}
