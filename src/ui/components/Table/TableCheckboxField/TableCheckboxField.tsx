import React from 'react'
import type { TableCheckboxFieldProps } from './TableCheckboxField.types'
import { Checkbox } from '../../Checkbox'
import './TableCheckboxField.css'

export const TableCheckboxField = ({ checked }: TableCheckboxFieldProps) => {
  return (
    <div className={'rotion-table-checkbox'}>
      <Checkbox bool={checked} />
    </div>
  )
}

export default TableCheckboxField
