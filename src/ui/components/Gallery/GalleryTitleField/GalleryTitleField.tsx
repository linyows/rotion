import { RichText } from '../../RichText/index.js'
import type { GalleryTitleFieldProps } from './GalleryTitleField.types'
import './GalleryTitleField.css'

const GalleryTitleField = ({ textObjects }: GalleryTitleFieldProps) => {
  return (
    <div className="rotion-gallery-title">
      {textObjects.map((t, i) => (
        <RichText key={`richtext-${i}`} textObject={t} />
      ))}
    </div>
  )
}

export default GalleryTitleField
