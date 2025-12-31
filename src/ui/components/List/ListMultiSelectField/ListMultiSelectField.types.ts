import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import type { ListPropertyOptions } from '../ListHandler.types'

export interface ListMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: ListPropertyOptions
}
