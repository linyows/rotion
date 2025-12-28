import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter/index.js'
import { ListPropertyOptions } from '../ListHandler.types'

export interface ListTitleFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  options?: ListPropertyOptions
}
