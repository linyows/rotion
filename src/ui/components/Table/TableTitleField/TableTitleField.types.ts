import type { ParsedUrlQueryInput } from 'node:querystring'
import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter'
import type { Link } from '../../types'

export interface TableTitleFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  path?: string
  slug?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
