import type { ReactNode } from 'react'
import { DateResponse } from '../../../../../../exporter'

export interface DateMentionProps {
  date: DateResponse
  children?: ReactNode
}
