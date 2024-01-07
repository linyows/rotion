import React from 'react'
import type { TableSelectFieldProps } from './TableSelectField.types'

const TableSelectField = ({ payload, path, link }: TableSelectFieldProps) => {
  const LinkedTag = (name: string) => {
    if (!path) {
      return (
        <span className="notionate-table-select-span">
          {name}
        </span>
      )
    }

    const href = `${path}tags/${encodeURIComponent(name)}`
    if (link) {
      const Link = link
      return (
        <>
          <Link className="notionate-table-select-a" href={href}>
            {name}
          </Link>
        </>
      )
    }
    return (
      <a className="notionate-table-select-a" href={href} title={name}>
        {name}
      </a>
    )
  }

  if (payload.select) {
    return (
      <div className={`notionate-table-select-div notionate-select-${payload.select.color}`}>
        {LinkedTag(payload.select.name)}
      </div>
    )
  }

  return <></>
}

export default TableSelectField
