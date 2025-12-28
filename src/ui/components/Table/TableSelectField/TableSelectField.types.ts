import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import { TablePropertyOptions } from '../TableHandler.types'

export interface TableSelectFieldProps {
  select: SelectPropertyResponse
  options?: TablePropertyOptions
}
