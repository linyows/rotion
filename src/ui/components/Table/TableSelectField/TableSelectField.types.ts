import type { SelectPropertyResponse } from '../../../../exporter'
import type { Link } from '../../types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export interface TableSelectFieldProps {
  select: SelectPropertyResponse
  path?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
