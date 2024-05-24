import React from 'react'
import type { ListMultiSelectFieldProps } from './ListMultiSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import './ListMultiSelectField.css'

const ListMultiSelectField = ({ multiSelect, options }: ListMultiSelectFieldProps) => {
  if (!multiSelect) {
    return <></>
  }
  const { pathname, link, query } = options || {}

  return (
    <ul className="rotion-list-multiselect-ul">
      {multiSelect.map(v => (
        <li key={v.id} className="rotion-list-multiselect-li">
          <LinkedTagIfLinked pathname={pathname ? `${pathname}/${encodeURIComponent(v.name)}` : undefined} color={v.color} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default ListMultiSelectField
