import React from 'react'
import type { ListCheckboxFieldProps } from './ListCheckboxField.types'

const ListCheckboxField = ({ payload }: ListCheckboxFieldProps) => {
  return (
    <div className="notionate-list-checkbox">
      {payload}
    </div>
  )
}

export default ListCheckboxField
