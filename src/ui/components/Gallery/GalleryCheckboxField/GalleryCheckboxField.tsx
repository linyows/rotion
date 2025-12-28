import React from 'react'
import type { GalleryCheckboxFieldProps } from './GalleryCheckboxField.types'
import { Checkbox } from '../../Checkbox/index.js'
import { PrefixSuffix } from '../../PrefixSuffix/index.js'
import './GalleryCheckboxField.css'

const GalleryCheckboxField = ({ checked, options }: GalleryCheckboxFieldProps) => {
  const { prefix, suffix } = options || {}
  return (
    <div className="rotion-gallery-checkbox">
      <PrefixSuffix prefix={prefix} suffix={suffix}>
        <Checkbox bool={checked} />
      </PrefixSuffix>
    </div>
  )
}

export default GalleryCheckboxField
