import React from 'react'
import type { TableNumberFieldProps } from './TableNumberField.types'
import './TableNumberField.css'

const TableNumberField = ({ number }: TableNumberFieldProps) => {
  return (
    <div className="rotion-table-number">
      {number}
    </div>
  )
}

export default TableNumberField
