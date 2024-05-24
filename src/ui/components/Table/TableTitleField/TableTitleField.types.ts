import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter'
import { TablePropertyOptions } from '../TableHandler.types'

export interface TableTitleFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  options?: TablePropertyOptions
}
