import type { RichTextItemResponse, RichTextItemResponseEx } from '../../../../exporter'
import { ListPropertyOptions } from '../ListHandler.types'

export interface LinkedTitleProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  options?: ListPropertyOptions
}
