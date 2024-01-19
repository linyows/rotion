import React from 'react'
import type { ListMultiSelectFieldProps } from './ListMultiSelectField.types'

const ListMultiSelectField = ({ payload, path, link, query }: ListMultiSelectFieldProps) => {
  const LinkedTag = (name: string) => {
    const href = `${path}tags/${encodeURIComponent(name)}`
    if (link && query) {
      const Link = link
      return (
        <>
          <Link className="notionate-list-multiselect-a" href={{ pathname: href, query }}>
            {name}
          </Link>
        </>
      )
    } else if (link) {
      const Link = link
      return (
        <>
          <Link className="notionate-list-multiselect-a" href={href}>
            {name}
          </Link>
        </>
      )
    }
    return (
      <a className="notionate-list-multiselect-a" href={href} title={name}>
        {name}
      </a>
    )
  }

  return (
    <ul className="notionate-list-multiselect-ul">
      {payload.multi_select.map(f => (
        <li key={f.id} className={`notionate-list-multiselect-li notionate-select-${f.color}`}>
          {LinkedTag(f.name)}
        </li>
      ))}
    </ul>
  )
}

export default ListMultiSelectField
