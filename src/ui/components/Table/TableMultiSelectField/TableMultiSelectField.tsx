import React from 'react'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import type { TableMultiSelectFieldProps } from './TableMultiSelectField.types'
import './TableMultiSelectField.css'

const TableMultiSelectField = ({ multiSelect, path, link, query }: TableMultiSelectFieldProps) => {
  return (
    <ul className="rotion-table-multiselect-ul">
      {multiSelect.map(v => (
        <li key={v.id} className="rotion-table-multiselect-li">
          <LinkedTagIfLinked pathname={path ? `${path}tags/${encodeURIComponent(v.name)}` : ''} color={v.color} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default TableMultiSelectField
