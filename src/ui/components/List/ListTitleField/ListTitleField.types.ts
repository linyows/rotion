import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter/index.js'
import type { ListPropertyOptions } from '../ListHandler.types'

export interface ListTitleFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  options?: ListPropertyOptions
}
