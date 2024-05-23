import type { PageObjectResponseEx } from '../../../exporter'
import { TableOptions } from './Table.types'

export interface ColumnProps {
  name: string
  page: PageObjectResponseEx
  options?: TableOptions
}
