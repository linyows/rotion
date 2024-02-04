import React from 'react'
import type { GalleryCheckboxFieldProps } from './GalleryCheckboxField.types'

const GalleryCheckboxField = ({ payload }: GalleryCheckboxFieldProps) => {
  return (
    <div className={'rotion-gallery-checkbox'}>
      {payload}
    </div>
  )
}

export default GalleryCheckboxField
