import React from 'react'
import type { GalleryTitleFieldProps } from './GalleryTitleField.types'
import { RichText } from '../../RichText'
import './GalleryTitleField.css'

const GalleryTitleField = ({ textObjects }: GalleryTitleFieldProps) => {
  return (
    <div className="rotion-gallery-title">
      {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
    </div>
  )
}

export default GalleryTitleField
