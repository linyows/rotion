import React from 'react'
import type { TableSelectFieldProps } from './TableSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    fontSize: '.75rem',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    minwidth: 0,
    borderRadius: '3px',
    padding: 0,
    color: 'rgb(24, 51, 71)',
    background: 'rgb(211, 229, 239) none repeat scroll 0% 0%',
    margin: '0 6px 0 0',
  },
})

const TableSelectField = ({ payload, path, link, query }: TableSelectFieldProps) => {
  const { select } = payload

  if (!select) {
    return <></>
  }

  return (
    <div className={`rotion-table-select ${Stylex(style.wrapper)}`}>
      <LinkedTagIfLinked pathname={`${path}tags/${encodeURIComponent(select.name)}`} color={select.color} link={link} query={query}>
        {select.name}
      </LinkedTagIfLinked>
    </div>
  )
}

export default TableSelectField
