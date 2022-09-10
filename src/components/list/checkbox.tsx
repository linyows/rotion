import React from 'react'

export type ListCheckboxProps = {
  payload: boolean
}

export const ListCheckboxField: React.FC<ListCheckboxProps> = ({ payload }) => {
  return (
    <div className="notionate-list-checkbox">
      {payload}
    </div>
  )
}

export default ListCheckboxField
