import React from 'react'
import { RichText } from '../../RichText'
import type { GalleryRichTextFieldProps } from './GalleryRichTextField.types'
import './GalleryRichTextField.css'

const GalleryRichTextField = ({ payload, size }: GalleryRichTextFieldProps) => {
  return (
    <div className={`rotion-gallery-richtext rotion-gallery-richtext-${size || 'medium'}`}>
      <RichText textObject={payload.rich_text} />
    </div>
  )
}

export default GalleryRichTextField
