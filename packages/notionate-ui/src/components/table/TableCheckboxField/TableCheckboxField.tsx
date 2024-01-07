import React from 'react'
import type { TableCheckboxFieldProps } from './TableCheckboxField.types'

export const TableCheckboxField = ({ payload }: TableCheckboxFieldProps) => {
  return (
    <div className="notionate-table-checkbox">
      {payload}
    </div>
  )
}

export default TableCheckboxField
