import type { ParsedUrlQueryInput } from 'node:querystring'
import type { MultiSelectPropertyItemObjectResponse } from '../../../../exporter'
import type { Link } from '../../types'

export interface ListMultiSelectFieldProps {
  payload: MultiSelectPropertyItemObjectResponse
  path: string
  link?: Link
  query?: ParsedUrlQueryInput
}
