import type { RichTextItemResponseEx, RichTextItemResponse } from '../../../../exporter'

export interface GalleryRichTextFieldProps {
  textObjects: RichTextItemResponseEx[] | RichTextItemResponse[]
  size?: 'small' | 'medium' | 'large'
}
