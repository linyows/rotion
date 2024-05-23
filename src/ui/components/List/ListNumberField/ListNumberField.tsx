import React from 'react'
import type { ListNumberFieldProps } from './ListNumberField.types'
import { PrefixSuffix } from '../../PrefixSuffix'
import './ListNumberField.css'

const ListNumberField = ({ number, options }: ListNumberFieldProps) => {
  return (
    <div className="rotion-list-number">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default ListNumberField
