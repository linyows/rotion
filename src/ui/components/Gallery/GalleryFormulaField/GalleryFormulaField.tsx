import React from 'react'
import type { GalleryFormulaFieldProps } from './GalleryFormulaField.types'
import { PrefixSuffix } from '../../PrefixSuffix'
import './GalleryFormulaField.css'

const GalleryFormulaField = ({ number, options }: GalleryFormulaFieldProps) => {
  return (
    <div className="rotion-gallery-formula">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default GalleryFormulaField
