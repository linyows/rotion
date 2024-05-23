import React from 'react'
import type { GalleryCheckboxFieldProps } from './GalleryCheckboxField.types'
import { Checkbox } from '../../Checkbox'
import { PrefixSuffix } from '../../PrefixSuffix'
import './GalleryCheckboxField.css'

const GalleryCheckboxField = ({ checked, options }: GalleryCheckboxFieldProps) => {
  return (
    <div className="rotion-gallery-checkbox">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        <Checkbox bool={checked} />
      </PrefixSuffix>
    </div>
  )
}

export default GalleryCheckboxField
