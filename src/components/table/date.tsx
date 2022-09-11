import React from 'react'
import type { DateResponse } from '../../server/types'

export const TableDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="notionate-table-date">
      {payload?.start}
    </div>
  )
}

export default TableDateField
