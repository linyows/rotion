import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import { TablePropertyOptions } from '../TableHandler.types'

export interface TableMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: TablePropertyOptions
}
