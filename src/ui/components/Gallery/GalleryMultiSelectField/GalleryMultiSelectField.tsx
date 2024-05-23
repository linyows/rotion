import React from 'react'
import type { GalleryMultiSelectFieldProps } from './GalleryMultiSelectField.types'
import LinkedTagIfLinked from './LinkedTag'
import './GalleryMultiSelectField.css'

const GalleryMultiSelectField = ({ multiSelect, options }: GalleryMultiSelectFieldProps) => {
  return (
    <ul className="rotion-gallery-multiselect-ul">
      {multiSelect.map(v => (
        <li key={v.id} className={`rotion-gallery-multiselect-li rotion-gallery-multiselect-${v.color}`}>
          <LinkedTagIfLinked pathname={options?.pathname ? `${options.pathname}/${encodeURIComponent(v.name)}` : undefined} link={options?.link} query={options?.query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default GalleryMultiSelectField
