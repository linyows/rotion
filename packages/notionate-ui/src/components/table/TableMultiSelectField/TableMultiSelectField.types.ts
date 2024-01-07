import type { MultiSelectPropertyItemObjectResponse } from 'notionate-pages'
import type { Link } from '../../types'

export interface TableMultiSelectFieldProps {
  payload: MultiSelectPropertyItemObjectResponse
  path?: string
  link?: Link
}
