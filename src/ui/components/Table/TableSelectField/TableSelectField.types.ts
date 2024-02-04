import type { SelectPropertyItemObjectResponse } from '../../../../exporter'
import type { Link } from '../../types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export interface TableSelectFieldProps {
  payload: SelectPropertyItemObjectResponse
  path?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
