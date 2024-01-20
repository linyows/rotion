import type { TitlePropertyItemObjectResponse } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface ListTitleFieldProps {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
  link?: Link
  query?: ParsedUrlQueryInput
}
