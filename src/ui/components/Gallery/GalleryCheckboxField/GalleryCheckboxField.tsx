import React from 'react'
import type { GalleryCheckboxFieldProps } from './GalleryCheckboxField.types'
import { Checkbox } from '../../Checkbox'
import './GalleryCheckboxField.css'

const GalleryCheckboxField = ({ checked }: GalleryCheckboxFieldProps) => {
  return (
    <div className="rotion-gallery-checkbox">
      <Checkbox bool={checked} />
    </div>
  )
}

export default GalleryCheckboxField
