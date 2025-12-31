import { PrefixSuffix } from '../../PrefixSuffix/index.js'
import type { GalleryFormulaFieldProps } from './GalleryFormulaField.types'
import './GalleryFormulaField.css'

const GalleryFormulaField = ({ number, options }: GalleryFormulaFieldProps) => {
  const { prefix, suffix } = options || {}

  return (
    <div className="rotion-gallery-formula">
      <PrefixSuffix prefix={prefix} suffix={suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default GalleryFormulaField
