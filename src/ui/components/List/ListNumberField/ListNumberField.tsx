import React from 'react'
import type { ListNumberFieldProps } from './ListNumberField.types'

const ListNumberField = ({ payload }: ListNumberFieldProps) => {
  return (
    <div className="notionate-list-number">
      {payload.number}
    </div>
  )
}

export default ListNumberField
