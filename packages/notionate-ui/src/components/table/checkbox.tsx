import React from 'react'

export type TableCheckboxProps = {
  payload: boolean
}

export const TableCheckboxField: React.FC<TableCheckboxProps> = ({ payload }) => {
  return (
    <div className="notionate-table-checkbox">
      {payload}
    </div>
  )
}

export default TableCheckboxField
