import React from 'react'
import type { ListFormulaFieldProps } from './ListFormulaField.types'
import { PrefixSuffix } from '../../PrefixSuffix'
import './ListFormulaField.css'

const ListFormulaField = ({ number, options }: ListFormulaFieldProps) => {
  const { prefix, suffix } = options || {}

  return (
    <div className="rotion-list-formula">
      <PrefixSuffix prefix={prefix} suffix={suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default ListFormulaField
