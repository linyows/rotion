import React from 'react'
import type { ListNumberFieldProps } from './ListNumberField.types'
import './ListNumberField.css'

const ListNumberField = ({ payload }: ListNumberFieldProps) => {
  return (
    <div className="rotion-list-number">
      {payload.number}
    </div>
  )
}

export default ListNumberField
