import React from 'react'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'
import { PrefixSuffix } from '../../PrefixSuffix/index.js'
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
