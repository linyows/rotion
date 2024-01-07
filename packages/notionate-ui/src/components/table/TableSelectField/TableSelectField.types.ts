import type { SelectPropertyItemObjectResponse } from 'notionate-pages'
import type { Link } from '../../types'

export interface TableSelectFieldProps {
  payload: SelectPropertyItemObjectResponse
  path?: string
  link?: Link
}
