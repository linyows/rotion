import React from 'react'
import type { GalleryTitleFieldProps } from './GalleryTitleField.types'

const GalleryTitleField = ({ payload }: GalleryTitleFieldProps) => {
  const title = payload.map(v => {
    const richtext = v.title
    switch (richtext.type) {
      case 'text':
        return richtext.text.content
      case 'mention':
        return richtext.mention.type
      default:
        return richtext.equation.expression
    }
  }).join(',')

  return (
    <div className="notionate-gallery-title">
      {title}
    </div>
  )
}

export default GalleryTitleField
