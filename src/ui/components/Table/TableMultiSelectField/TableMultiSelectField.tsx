import React from 'react'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import type { TableMultiSelectFieldProps } from './TableMultiSelectField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    listStyleType: 'none',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  li: {
    fontSize: '.75rem',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    minWidth: 0,
    padding: 0,
    margin: '0 6px 0 0',
  },
})

const TableMultiSelectField = ({ payload, path, link, query }: TableMultiSelectFieldProps) => {
  return (
    <ul className={`rotion-table-multiselect-ul ${Stylex(style.wrapper)}`}>
      {payload.multi_select.map(v => (
        <li key={v.id} className={`rotion-table-multiselect-li ${Stylex(style.li)}`}>
          <LinkedTagIfLinked pathname={path ? `${path}tags/${encodeURIComponent(v.name)}` : ''} color={v.color} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default TableMultiSelectField
