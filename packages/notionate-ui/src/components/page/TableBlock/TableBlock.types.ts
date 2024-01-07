import type { ReactNode } from 'react'
import type {
  TableBlockObjectResponseEx,
  RichTextItemResponse,
} from 'notionate-pages'

export interface TableBlockProps {
  block: TableBlockObjectResponseEx
}

export interface TrProps {
  key: string
  children: ReactNode
}

export interface ThTdProps {
  cell: RichTextItemResponse
  key: string
}
