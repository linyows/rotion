import React from 'react'
import TextBlock from '../../Page/TextBlock'
import type { GalleryRichTextFieldProps } from './RichTextField.types'

const GalleryRichTextField = ({ payload }: GalleryRichTextFieldProps) => {
  return (
    <div className="notionate-gallery-richtext">
      <TextBlock tag="span" block={[payload.rich_text]} />
    </div>
  )
}

export default GalleryRichTextField
