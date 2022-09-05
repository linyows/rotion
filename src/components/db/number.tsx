import React from 'react'
import type {
  NumberPropertyItemObjectResponse,
} from '../../server/types'

export type NumberProps = {
  payload: NumberPropertyItemObjectResponse
}

export const DBNumberField: React.FC<NumberProps> = ({ payload }) => {
  return (
    <div className="notionate-db-number">
      {payload.number}
    </div>
  )
}

export default DBNumberField
