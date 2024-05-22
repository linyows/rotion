import React from 'react'
import type { GalleryFormulaFieldProps } from './GalleryFormulaField.types'
import './GalleryFormulaField.css'

const GalleryFormulaField = ({ number }: GalleryFormulaFieldProps) => {
  return (
    <div className="rotion-gallery-formula">
      {number}
    </div>
  )
}

export default GalleryFormulaField
