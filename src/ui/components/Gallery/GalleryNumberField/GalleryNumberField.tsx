import React from 'react'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'
import { PrefixSuffix } from '../../PrefixSuffix'
import './GalleryNumberField.css'

const GalleryNumberField = ({ number, options }: GalleryNumberFieldProps) => {
  return (
    <div className="rotion-gallery-number">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default GalleryNumberField
