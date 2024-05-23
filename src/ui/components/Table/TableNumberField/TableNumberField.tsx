import React from 'react'
import type { TableNumberFieldProps } from './TableNumberField.types'
import { PrefixSuffix } from '../../PrefixSuffix'
import './TableNumberField.css'

const TableNumberField = ({ number, options }: TableNumberFieldProps) => {
  return (
    <div className="rotion-table-number">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default TableNumberField
