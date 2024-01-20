import React from 'react'
import type { TableNumberFieldProps } from './TableNumberField.types'

const TableNumberField = ({ payload }: TableNumberFieldProps) => {
  return (
    <div className="notionate-table-number">
      {payload.number}
    </div>
  )
}

export default TableNumberField
