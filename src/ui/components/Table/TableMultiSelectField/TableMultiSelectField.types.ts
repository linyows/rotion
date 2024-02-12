import type { MultiSelectPropertyItemObjectResponse } from '../../../../exporter'
import type { Link } from '../../types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export interface TableMultiSelectFieldProps {
  payload: MultiSelectPropertyItemObjectResponse
  path?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
