import React from 'react'
import type { ListFormulaFieldProps } from './ListFormulaField.types'
import './ListFormulaField.css'

const ListFormulaField = ({ number }: ListFormulaFieldProps) => {
  return (
    <div className="rotion-list-formula">
      {number}
    </div>
  )
}

export default ListFormulaField
