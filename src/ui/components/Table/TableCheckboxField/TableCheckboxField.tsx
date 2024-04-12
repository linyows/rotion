import React from 'react'
import type { TableCheckboxFieldProps } from './TableCheckboxField.types'
import { Checkbox } from '../../Checkbox'

export const TableCheckboxField = ({ payload }: TableCheckboxFieldProps) => {
  return (
    <div className={'rotion-table-checkbox'}>
      <Checkbox bool={payload} />
    </div>
  )
}

export default TableCheckboxField
