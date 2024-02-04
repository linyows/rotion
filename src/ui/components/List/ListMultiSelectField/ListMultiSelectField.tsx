import React from 'react'
import type { ListMultiSelectFieldProps } from './ListMultiSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    listStyleType: 'none',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    padding: 0,
    margin: '0 7px',
    maxWidth: '400px',
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

const ListMultiSelectField = ({ payload, path, link, query }: ListMultiSelectFieldProps) => {
  const { multi_select } = payload

  return (
    <ul className={`rotion-list-multiselect-ul ${Stylex(style.wrapper)}`}>
      {multi_select.map(v => (
        <li key={v.id} className={`rotion-list-multiselect-li ${Stylex(style.li)}`}>
          <LinkedTagIfLinked pathname={`${path}tags/${encodeURIComponent(v.name)}`} color={v.color} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default ListMultiSelectField
