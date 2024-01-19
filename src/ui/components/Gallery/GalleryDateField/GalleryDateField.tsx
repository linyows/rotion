import React from 'react'
import type { GalleryDateFieldProps } from './DateField.types'

const GalleryDateField = ({ payload }: GalleryDateFieldProps) => {
  return (
    <div className="notionate-gallery-date">
      {payload?.start}
    </div>
  )
}

export default GalleryDateField
