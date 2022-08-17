import React from 'react'

export type DBCheckboxProps = {
  payload: boolean
}

export const DBCheckboxField: React.FC<DBCheckboxProps> = ({ payload }) => {
  return (
    <div>
      {payload}
    </div>
  )
}

export default DBCheckboxField
