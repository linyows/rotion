import React from 'react'
import type { TableSelectFieldProps } from './TableSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import './TableSelectField.css'

const TableSelectField = ({ select, options }: TableSelectFieldProps) => {
  if (!select) {
    return <></>
  }

  return (
    <div className="rotion-table-select">
      <LinkedTagIfLinked pathname={options?.pathname ? `${options.pathname}/${encodeURIComponent(select.name)}` : ''} color={select.color} link={options?.link} query={options?.query}>
        {select.name}
      </LinkedTagIfLinked>
    </div>
  )
}

export default TableSelectField
