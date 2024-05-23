import type { SelectPropertyResponse } from '../../../../exporter'
import { ListPropertyOptions } from '../ListHandler.types'

export interface ListSelectFieldProps {
  select: SelectPropertyResponse
  options?: ListPropertyOptions
}
