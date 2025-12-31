import { PrefixSuffix } from '../../PrefixSuffix/index.js'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'
import './GalleryNumberField.css'

const GalleryNumberField = ({ number, options }: GalleryNumberFieldProps) => {
  const { prefix, suffix } = options || {}

  return (
    <div className="rotion-gallery-number">
      <PrefixSuffix prefix={prefix} suffix={suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default GalleryNumberField
