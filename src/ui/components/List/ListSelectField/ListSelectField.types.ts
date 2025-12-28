import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import { ListPropertyOptions } from '../ListHandler.types'

export interface ListSelectFieldProps {
  select: SelectPropertyResponse
  options?: ListPropertyOptions
}
