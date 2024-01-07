import React from 'react'
import TableIcon from './TableIcon/TableIcon'
import type { TablePropertyNameAndIconProps } from './TablePropertyNameAndIcon.types'

const TablePropertyNameAndIcon = ({ name, db }: TablePropertyNameAndIconProps) => {
  if (!(name in db.meta.properties)) {
    return (
      <>
        {`Unknown "${name}"`}
      </>
    )
  }
  const propType = db.meta.properties[name].type
  return (
    <div className="notionate-table-cell-inner">
      <TableIcon type={propType} />
      <div className="notionate-table-cell-text">
        {name}
      </div>
    </div>
  )
}

export default TablePropertyNameAndIcon
