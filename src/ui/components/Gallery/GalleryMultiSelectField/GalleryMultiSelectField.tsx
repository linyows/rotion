import React from 'react'
import type { GalleryMultiSelectFieldProps } from './GalleryMultiSelectField.types'
import LinkedTagIfLinked from './LinkedTag'
import './GalleryMultiSelectField.css'

const GalleryMultiSelectField = ({ multiSelect, path, link, query }: GalleryMultiSelectFieldProps) => {
  return (
    <ul className="rotion-gallery-multiselect-ul">
      {multiSelect.map(v => (
        <li key={v.id} className={`rotion-gallery-multiselect-li rotion-gallery-multiselect-${v.color}`}>
          <LinkedTagIfLinked pathname={path ? `${path}tags/${encodeURIComponent(v.name)}` : ''} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default GalleryMultiSelectField
