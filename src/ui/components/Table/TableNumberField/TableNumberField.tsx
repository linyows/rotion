import React from 'react'
import type { TableNumberFieldProps } from './TableNumberField.types'
import './TableNumberField.css'

const TableNumberField = ({ payload }: TableNumberFieldProps) => {
  return (
    <div className="rotion-table-number">
      {payload.number}
    </div>
  )
}

export default TableNumberField
