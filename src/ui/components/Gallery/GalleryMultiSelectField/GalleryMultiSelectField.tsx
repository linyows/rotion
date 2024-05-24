import React from 'react'
import type { GalleryMultiSelectFieldProps } from './GalleryMultiSelectField.types'
import LinkedTagIfLinked from './LinkedTag'
import './GalleryMultiSelectField.css'

const GalleryMultiSelectField = ({ multiSelect, options }: GalleryMultiSelectFieldProps) => {
  const { pathname, link, query } = options || {}
  return (
    <ul className="rotion-gallery-multiselect-ul">
      {multiSelect.map(v => (
        <li key={v.id} className={`rotion-gallery-multiselect-li rotion-gallery-multiselect-${v.color}`}>
          <LinkedTagIfLinked pathname={pathname ? `${pathname}/${encodeURIComponent(v.name)}` : undefined} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default GalleryMultiSelectField
