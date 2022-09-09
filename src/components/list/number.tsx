import React from 'react'
import type {
  NumberPropertyItemObjectResponse,
} from '../../server/types'

export type ListNumberProps = {
  payload: NumberPropertyItemObjectResponse
}

export const ListNumberField: React.FC<ListNumberProps> = ({ payload }) => {
  return (
    <div className="notionate-list-number">
      {payload.number}
    </div>
  )
}

export default ListNumberField
