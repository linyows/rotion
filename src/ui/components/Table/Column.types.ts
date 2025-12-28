import type { PageObjectResponseEx } from '../../../exporter/index.js'
import { TableOptions } from './Table.types'

export interface ColumnProps {
  name: string
  page: PageObjectResponseEx
  options?: TableOptions
}
