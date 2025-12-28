import React from 'react'
import LinkedTagIfLinked from './LinkedTagIfLinked.js'
import type { TableMultiSelectFieldProps } from './TableMultiSelectField.types'
import './TableMultiSelectField.css'

const TableMultiSelectField = ({ multiSelect, options }: TableMultiSelectFieldProps) => {
  const { pathname, link, query } = options || {}
  return (
    <ul className="rotion-table-multiselect-ul">
      {multiSelect.map(v => (
        <li key={v.id} className="rotion-table-multiselect-li">
          <LinkedTagIfLinked pathname={pathname ? `${pathname}/${encodeURIComponent(v.name)}` : ''} color={v.color} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default TableMultiSelectField
