import type { SelectPropertyResponse } from '../../../../exporter'
import { ListPropertyOptions } from '../ListHandler.types'

export interface ListMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: ListPropertyOptions
}
