import React from 'react'
import type { ListDateFieldProps } from './ListDateField.types'

const ListDateField = ({ payload }: ListDateFieldProps) => {
  return (
    <div className="notionate-list-date">
      {payload?.start}
    </div>
  )
}

export default ListDateField
