import type { RichTextItemResponse, RichTextItemResponseEx } from '../../../../exporter/index.js'
import { ListPropertyOptions } from '../ListHandler.types'

export interface LinkedTitleProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  options?: ListPropertyOptions
}
