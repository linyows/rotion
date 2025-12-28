import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter/index.js'

export interface GalleryRichTextFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  size?: 'small' | 'medium' | 'large'
}
