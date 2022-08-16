import React from 'react'
import type { DateResponse } from '../../types'

export const DBDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="date">
      {payload?.start}
      <style jsx>{`
        .date {
          white-space: nowrap;
          font-size: var(--fontSize-0);
          font-family: var(--fontFamily-sans);
          display: flex;
          align-items: center;
          margin-left: 14px;
          margin-right: 0px;
          min-width: 20px;
        }
      `}</style>
    </div>
  )
}

export default DBDateField
