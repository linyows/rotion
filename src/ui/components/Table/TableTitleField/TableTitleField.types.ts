import type { ParsedUrlQueryInput } from 'node:querystring'
import type { TitlePropertyItemObjectResponse } from '../../../../exporter'
import type { Link } from '../../types'

export interface TableTitleFieldProps {
  payload: Array<TitlePropertyItemObjectResponse>
  path?: string
  slug?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
