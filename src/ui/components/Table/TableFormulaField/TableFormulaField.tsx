import React from 'react'
import type { TableFormulaFieldProps } from './TableFormulaField.types'
import { PrefixSuffix } from '../../PrefixSuffix/index.js'
import './TableFormulaField.css'

const TableFormulaField = ({ number, options }: TableFormulaFieldProps) => {
  return (
    <div className="rotion-table-formula">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default TableFormulaField
