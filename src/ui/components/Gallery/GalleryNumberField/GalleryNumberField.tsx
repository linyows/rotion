import React from 'react'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'
import './GalleryNumberField.css'

const GalleryNumberField = ({ number }: GalleryNumberFieldProps) => {
  return (
    <div className="rotion-gallery-number">
      {number}
    </div>
  )
}

export default GalleryNumberField
