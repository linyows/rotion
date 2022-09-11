import React from 'react'
import type {
  NumberPropertyItemObjectResponse,
} from '../../server/types'

export type TableNumberProps = {
  payload: NumberPropertyItemObjectResponse
}

export const TableNumberField: React.FC<TableNumberProps> = ({ payload }) => {
  return (
    <div className="notionate-table-number">
      {payload.number}
    </div>
  )
}

export default TableNumberField
