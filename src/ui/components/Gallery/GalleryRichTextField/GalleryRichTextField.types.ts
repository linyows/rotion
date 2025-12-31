import type { RichTextItemResponse, RichTextItemResponseEx } from '../../../../exporter/index.js'

export interface GalleryRichTextFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  size?: 'small' | 'medium' | 'large'
}
