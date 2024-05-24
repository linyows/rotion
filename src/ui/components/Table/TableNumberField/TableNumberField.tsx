import React from 'react'
import type { TableNumberFieldProps } from './TableNumberField.types'
import { PrefixSuffix } from '../../PrefixSuffix'
import './TableNumberField.css'

const TableNumberField = ({ number, options }: TableNumberFieldProps) => {
  const { prefix, suffix } = options || {}
  return (
    <div className="rotion-table-number">
      <PrefixSuffix prefix={prefix} suffix={suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default TableNumberField
