import React from 'react'

export const DBCheckboxField: React.FC<{ payload: boolean }> = ({ payload }) => {
  return (
    <div>
      {payload}
    </div>
  )
}

export default DBCheckboxField
