import React from 'react'
import type { ListNumberFieldProps } from './ListNumberField.types'

const ListNumberField = ({ payload }: ListNumberFieldProps) => {
  return (
    <div className="rotion-list-number">
      {payload.number}
    </div>
  )
}

export default ListNumberField
