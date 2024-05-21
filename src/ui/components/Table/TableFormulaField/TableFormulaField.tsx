import React from 'react'
import type { TableFormulaFieldProps } from './TableFormulaField.types'
import './TableFormulaField.css'

const TableFormulaField = ({ number }: TableFormulaFieldProps) => {
  return (
    <div className="rotion-table-formula">
      {number}
    </div>
  )
}

export default TableFormulaField
