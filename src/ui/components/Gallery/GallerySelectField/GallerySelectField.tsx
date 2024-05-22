import React from 'react'
import type { GallerySelectFieldProps } from './GallerySelectField.types'
import LinkedTagIfLinked from './LinkedTag'
import './GallerySelectField.css'

const GalleryMultiSelectField = ({ select, path, link, query }: GallerySelectFieldProps) => {
  const { name, color } = select
  const pathname = path ? `${path}tags/${encodeURIComponent(name)}` : undefined
  return (
    <div className="rotion-gallery-select">
      <span className={`rotion-gallery-select-wrapper rotion-gallery-select-${color}`}>
        <LinkedTagIfLinked pathname={pathname} link={link} query={query}>
          {name}
        </LinkedTagIfLinked>
      </span>
    </div>
  )
}

export default GalleryMultiSelectField
