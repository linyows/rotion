import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter/index.js'
import { TablePropertyOptions } from '../TableHandler.types'

export interface TableTitleFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  options?: TablePropertyOptions
}
