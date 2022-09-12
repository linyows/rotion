import React, { ReactElement } from 'react'
import colorStyle from '../lib/colorstyle'
import type {
  MultiSelectPropertyItemObjectResponse,
} from '../../server/types'

export type ListMultiSelectProps = {
  payload: MultiSelectPropertyItemObjectResponse
  path: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
}

export const ListMultiSelectField: React.FC<ListMultiSelectProps> = ({ payload, path, link }) => {
  const LinkedTag = (name: string) => {
    const href = `${path}tags/${encodeURIComponent(name)}`
    if (link) {
      const Link = link
      return (
        <>
          <Link href={href}>
            <a className="notionate-list-multiselect-a" title={name}>
              {name}
            </a>
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
        <li key={f.id} className="notionate-list-multiselect-li" style={colorStyle(f.color)}>
          {LinkedTag(f.name)}
        </li>
      ))}
    </ul>
  )
}

export default ListMultiSelectField
