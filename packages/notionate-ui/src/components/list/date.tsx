import React from 'react'
import type { DateResponse } from 'notionate-pages'

export const ListDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="notionate-list-date">
      {payload?.start}
    </div>
  )
}

export default ListDateField
