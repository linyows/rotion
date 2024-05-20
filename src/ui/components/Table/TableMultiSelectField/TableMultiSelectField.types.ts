import type { SelectPropertyResponse } from '../../../../exporter'
import type { Link } from '../../types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export interface TableMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  path?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
