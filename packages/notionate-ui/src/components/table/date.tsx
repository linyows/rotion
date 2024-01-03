import React from 'react'
import type { DateResponse } from 'notionate-pages'

export const TableDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="notionate-table-date">
      {payload?.start}
    </div>
  )
}

export default TableDateField
