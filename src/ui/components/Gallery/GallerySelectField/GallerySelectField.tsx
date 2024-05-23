import React from 'react'
import type { GallerySelectFieldProps } from './GallerySelectField.types'
import LinkedTagIfLinked from './LinkedTag'
import './GallerySelectField.css'

const GalleryMultiSelectField = ({ select, options }: GallerySelectFieldProps) => {
  const { name, color } = select
  return (
    <div className="rotion-gallery-select">
      <span className={`rotion-gallery-select-wrapper rotion-gallery-select-${color}`}>
        <LinkedTagIfLinked pathname={options?.pathname ? `${options.pathname}/${encodeURIComponent(name)}` : undefined} link={options?.link} query={options?.query}>
          {name}
        </LinkedTagIfLinked>
      </span>
    </div>
  )
}

export default GalleryMultiSelectField
