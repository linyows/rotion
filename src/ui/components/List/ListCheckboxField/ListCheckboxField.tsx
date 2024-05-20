import React from 'react'
import type { ListCheckboxFieldProps } from './ListCheckboxField.types'
import { Checkbox } from '../../Checkbox'
import './ListCheckboxField.css'

const ListCheckboxField = ({ checked }: ListCheckboxFieldProps) => {
  return (
    <div className="rotion-list-checkbox">
      <Checkbox bool={checked} />
    </div>
  )
}

export default ListCheckboxField
