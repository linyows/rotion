import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface ListTitleFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  path: string
  slug: string
  link?: Link
  query?: ParsedUrlQueryInput
}
