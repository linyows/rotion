import type { RichTextItemResponse, RichTextItemResponseEx } from '../../../../exporter/index.js'
import type { TablePropertyOptions } from '../TableHandler.types'

export interface TableTitleFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  options?: TablePropertyOptions
}
