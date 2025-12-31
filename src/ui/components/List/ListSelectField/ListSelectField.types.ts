import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import type { ListPropertyOptions } from '../ListHandler.types'

export interface ListSelectFieldProps {
  select: SelectPropertyResponse
  options?: ListPropertyOptions
}
