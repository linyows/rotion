import type { SelectPropertyResponse } from '../../../../exporter'
import { TablePropertyOptions } from '../TableHandler.types'

export interface TableMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: TablePropertyOptions
}
