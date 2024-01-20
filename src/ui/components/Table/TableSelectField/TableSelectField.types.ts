import type { SelectPropertyItemObjectResponse } from '../../../../exporter'
import type { Link } from '../../types'

export interface TableSelectFieldProps {
  payload: SelectPropertyItemObjectResponse
  path?: string
  link?: Link
}
