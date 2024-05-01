import React from 'react'
import type { GalleryCheckboxFieldProps } from './GalleryCheckboxField.types'
import { Checkbox } from '../../Checkbox'
import './GalleryCheckboxField.css'

const GalleryCheckboxField = ({ payload }: GalleryCheckboxFieldProps) => {
  return (
    <div className="rotion-gallery-checkbox">
      <Checkbox bool={payload} />
    </div>
  )
}

export default GalleryCheckboxField
