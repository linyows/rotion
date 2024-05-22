import React from 'react'
import type { ListNumberFieldProps } from './ListNumberField.types'
import './ListNumberField.css'

const ListNumberField = ({ number }: ListNumberFieldProps) => {
  return (
    <div className="rotion-list-number">
      {number}
    </div>
  )
}

export default ListNumberField
