import React from 'react'
import type { ListFormulaFieldProps } from './ListFormulaField.types'
import { PrefixSuffix } from '../../PrefixSuffix'
import './ListFormulaField.css'

const ListFormulaField = ({ number, options }: ListFormulaFieldProps) => {
  return (
    <div className="rotion-list-formula">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default ListFormulaField
