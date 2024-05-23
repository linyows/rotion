import React from 'react'
import type { ListCheckboxFieldProps } from './ListCheckboxField.types'
import { Checkbox } from '../../Checkbox'
import { PrefixSuffix } from '../../PrefixSuffix'
import './ListCheckboxField.css'

const ListCheckboxField = ({ checked, options }: ListCheckboxFieldProps) => {
  return (
    <div className="rotion-list-checkbox">
      <PrefixSuffix prefix={options?.prefix} suffix={options?.suffix}>
        <Checkbox bool={checked} />
      </PrefixSuffix>
    </div>
  )
}

export default ListCheckboxField
