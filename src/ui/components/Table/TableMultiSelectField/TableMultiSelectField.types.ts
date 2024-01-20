import type { MultiSelectPropertyItemObjectResponse } from '../../../../exporter'
import type { Link } from '../../types'

export interface TableMultiSelectFieldProps {
  payload: MultiSelectPropertyItemObjectResponse
  path?: string
  link?: Link
}
