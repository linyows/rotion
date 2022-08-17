import React from 'react'
import type { DateResponse } from '../../types'

export const DBDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="date">
      {payload?.start}
      <style jsx>{`
        .date {
          white-space: nowrap;
          font-size: .85rem;
          display: flex;
          align-items: center;
          margin-left: 14px;
          margin-right: 0px;
          min-width: 20px;
          color: #999;
        }
      `}</style>
    </div>
  )
}

export default DBDateField
