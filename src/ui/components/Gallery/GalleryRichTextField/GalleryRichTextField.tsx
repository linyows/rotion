import { richTextKey } from '../../lib.js'
import { RichText } from '../../RichText/index.js'
import type { GalleryRichTextFieldProps } from './GalleryRichTextField.types'
import './GalleryRichTextField.css'

const GalleryRichTextField = ({ textObjects, size }: GalleryRichTextFieldProps) => {
  return (
    <div className={`rotion-gallery-richtext rotion-gallery-richtext-${size || 'medium'}`}>
      {textObjects.map((t, i) => (
        <RichText key={richTextKey(t.plain_text, i)} textObject={t} />
      ))}
    </div>
  )
}

export default GalleryRichTextField
