import React from 'react'
import type { TableDateFieldProps } from './TableDateField.types'

const TableDateField = ({ payload }: TableDateFieldProps) => {
  return (
    <div className="notionate-table-date">
      {payload?.start}
    </div>
  )
}

export default TableDateField
