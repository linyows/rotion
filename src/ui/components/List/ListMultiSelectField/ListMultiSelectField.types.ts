import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import { ListPropertyOptions } from '../ListHandler.types'

export interface ListMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: ListPropertyOptions
}
