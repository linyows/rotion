import React from 'react'
import type { TableUrlFieldProps } from './TableUrlField.types'

const TableUrlField = ({ payload }: TableUrlFieldProps) => {
  if (payload === null) {
    return (<></>)
  }

  return (
    <div className="notionate-table-url">
      <a className="notionate-table-url-a" href={payload} rel="noreferrer" target="_blank">
        <span className="notionate-table-url-address">
          {payload}
        </span>
      </a>
    </div>
  )
}

export default TableUrlField
