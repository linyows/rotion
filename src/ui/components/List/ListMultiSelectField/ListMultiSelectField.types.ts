import type { ParsedUrlQueryInput } from 'node:querystring'
import type { SelectPropertyResponse } from '../../../../exporter'
import type { Link } from '../../types'

export interface ListMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  path: string
  link?: Link
  query?: ParsedUrlQueryInput
}
