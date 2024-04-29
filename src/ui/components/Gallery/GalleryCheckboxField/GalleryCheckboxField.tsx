import React from 'react'
import type { GalleryCheckboxFieldProps } from './GalleryCheckboxField.types'
import { Checkbox } from '../../Checkbox'

const GalleryCheckboxField = ({ payload }: GalleryCheckboxFieldProps) => {
  return (
    <div className="rotion-gallery-checkbox">
      <Checkbox bool={payload} />
    </div>
  )
}

export default GalleryCheckboxField
