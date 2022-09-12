import React, { ReactElement } from 'react'
import colorStyle from '../lib/colorstyle'
import type {
  MultiSelectPropertyItemObjectResponse,
} from '../../server/types'

export type TableMultiSelectProps = {
  payload: MultiSelectPropertyItemObjectResponse
  path: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
}

export const TableMultiSelectField: React.FC<TableMultiSelectProps> = ({ payload, path, link }) => {
  const LinkedTag = (name: string) => {
    const href = `${path}tags/${encodeURIComponent(name)}`
    if (link) {
      const Link = link
      return (
        <>
          <Link href={href}>
            <a className="notionate-table-multiselect-a" title={name}>
              {name}
            </a>
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
        <li key={f.id} className="notionate-table-multiselect-li" style={colorStyle(f.color)}>
          {LinkedTag(f.name)}
        </li>
      ))}
    </ul>
  )
}

export default TableMultiSelectField
