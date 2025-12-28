import type { PageObjectResponseEx } from '../../../exporter/index.js'
import type { ListOptions } from './List.types'

export interface ColumnProps {
  name: string
  page: PageObjectResponseEx
  options?: ListOptions
}
