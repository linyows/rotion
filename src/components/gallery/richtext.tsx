import React from 'react'
import type {
  RichTextPropertyItemObjectResponse,
} from '../../server/types'
import TextBlock from '../page/text'

export type GalleryRichTextProps = {
  payload: RichTextPropertyItemObjectResponse
}

export const GalleryRichTextField: React.FC<GalleryRichTextProps> = ({ payload }) => {
  return (
    <div className="notionate-gallery-richtext">
      <TextBlock tag="span" block={[payload.rich_text]} />
    </div>
  )
}

export default GalleryRichTextField
