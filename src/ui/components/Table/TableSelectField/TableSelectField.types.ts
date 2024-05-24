import type { SelectPropertyResponse } from '../../../../exporter'
import { TablePropertyOptions } from '../TableHandler.types'

export interface TableSelectFieldProps {
  select: SelectPropertyResponse
  options?: TablePropertyOptions
}
