import React from 'react'
import type { TableSelectFieldProps } from './TableSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import './TableSelectField.css'

const TableSelectField = ({ select, path, link, query }: TableSelectFieldProps) => {
  if (!select) {
    return <></>
  }

  return (
    <div className="rotion-table-select">
      <LinkedTagIfLinked pathname={path ? `${path}tags/${encodeURIComponent(select.name)}` : ''} color={select.color} link={link} query={query}>
        {select.name}
      </LinkedTagIfLinked>
    </div>
  )
}

export default TableSelectField
