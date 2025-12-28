import React from 'react'
import type { TableCheckboxFieldProps } from './TableCheckboxField.types'
import { Checkbox } from '../../Checkbox/index.js'
import { PrefixSuffix } from '../../PrefixSuffix/index.js'
import './TableCheckboxField.css'

export const TableCheckboxField = ({ checked, options }: TableCheckboxFieldProps) => {
  return (
    <div className={'rotion-table-checkbox'}>
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        <Checkbox bool={checked} />
      </PrefixSuffix>
    </div>
  )
}

export default TableCheckboxField
