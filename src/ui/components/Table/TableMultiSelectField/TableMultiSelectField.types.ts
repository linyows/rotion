import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import type { TablePropertyOptions } from '../TableHandler.types'

export interface TableMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: TablePropertyOptions
}
