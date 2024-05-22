import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'
import type { RichTextItemResponse, RichTextItemResponseEx } from '../../../../exporter'

export interface LinkedTitleProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}
