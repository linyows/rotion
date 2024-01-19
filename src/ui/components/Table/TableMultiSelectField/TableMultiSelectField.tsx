import React from 'react'
import type { TableMultiSelectFieldProps } from './TableMultiSelectField.types'

const TableMultiSelectField = ({ payload, path, link }: TableMultiSelectFieldProps) => {
  const LinkedTag = (name: string) => {
    if (!path) {
      return (
        <span className="notionate-table-multiselect-span">
          {name}
        </span>
      )
    }
    const href = `${path}tags/${encodeURIComponent(name)}`
    if (link) {
      const Link = link
      return (
        <>
          <Link className="notionate-table-multiselect-a" href={href}>
            {name}
          </Link>
        </>
      )
    }
    return (
      <a className="notionate-table-multiselect-a" href={href} title={name}>
        {name}
      </a>
    )
  }

  return (
    <ul className="notionate-table-multiselect-ul">
      {payload.multi_select.map(f => (
        <li key={f.id} className={`notionate-table-multiselect-li notionate-select-${f.color}`}>
          {LinkedTag(f.name)}
        </li>
      ))}
    </ul>
  )
}

export default TableMultiSelectField
