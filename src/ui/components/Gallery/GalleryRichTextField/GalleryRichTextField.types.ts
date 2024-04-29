import type { RichTextPropertyItemObjectResponse } from '../../../../exporter'

export interface GalleryRichTextFieldProps {
  payload: RichTextPropertyItemObjectResponse
  size?: 'small' | 'medium' | 'large'
}
