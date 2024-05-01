import React from 'react'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'
import './GalleryNumberField.css'

const GalleryNumberField = ({ payload }: GalleryNumberFieldProps) => {
  return (
    <div className="rotion-gallery-number">
      {payload.number}
    </div>
  )
}

export default GalleryNumberField
