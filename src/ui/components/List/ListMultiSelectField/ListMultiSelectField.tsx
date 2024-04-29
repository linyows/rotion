import React from 'react'
import type { ListMultiSelectFieldProps } from './ListMultiSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'

const ListMultiSelectField = ({ payload, path, link, query }: ListMultiSelectFieldProps) => {
  const { multi_select } = payload

  return (
    <ul className="rotion-list-multiselect-ul">
      {multi_select.map(v => (
        <li key={v.id} className="rotion-list-multiselect-li">
          <LinkedTagIfLinked pathname={path ? `${path}tags/${encodeURIComponent(v.name)}` : ''} color={v.color} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default ListMultiSelectField
