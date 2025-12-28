import React from 'react'
import type { ListNumberFieldProps } from './ListNumberField.types'
import { PrefixSuffix } from '../../PrefixSuffix/index.js'
import './ListNumberField.css'

const ListNumberField = ({ number, options }: ListNumberFieldProps) => {
  const { prefix, suffix } = options || {}

  return (
    <div className="rotion-list-number">
      <PrefixSuffix prefix={prefix} suffix={suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default ListNumberField
