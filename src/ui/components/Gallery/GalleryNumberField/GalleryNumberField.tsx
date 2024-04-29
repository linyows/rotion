import React from 'react'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'

const GalleryNumberField = ({ payload }: GalleryNumberFieldProps) => {
  return (
    <div className="rotion-gallery-number">
      {payload.number}
    </div>
  )
}

export default GalleryNumberField
