import React from 'react'

export type TableUrlProps = {
  payload: string|null
}

export const TableUrlField: React.FC<TableUrlProps> = ({ payload }) => {
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
