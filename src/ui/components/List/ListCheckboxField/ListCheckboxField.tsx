import React from 'react'
import type { ListCheckboxFieldProps } from './ListCheckboxField.types'
import { Checkbox } from '../../Checkbox'

const ListCheckboxField = ({ payload }: ListCheckboxFieldProps) => {
  return (
    <div className="rotion-list-checkbox">
      <Checkbox bool={payload} />
    </div>
  )
}

export default ListCheckboxField
