import React from 'react'
import type { DateResponse } from '../../types'

export const DBDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="notionate-db-date">
      {payload?.start}
    </div>
  )
}

export default DBDateField
