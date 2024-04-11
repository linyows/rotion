import React from 'react'
import { cdate } from 'cdate'
import type { TableDateFieldProps } from './TableDateField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'
import { getDatetimeFormat } from '../../lib'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    whiteSpace: 'nowrap',
    fontSize: '.85rem',
    display: 'flex',
    alignItems: 'center',
    minWidth: '20px',
    color: tokens.primaryText,
  },
})

const TableDateField = ({ payload }: TableDateFieldProps) => {
  if (payload === null) {
    return <></>
  }

  const { start, end } = payload
  const { dateF, timeF } = getDatetimeFormat()
  return (
    <div className={`rotion-table-date ${Stylex(style.wrapper)}`}>
      {cdate(start).format(start.length > 10 ? `${dateF} ${timeF}` : dateF)}
      {end && ` → ${cdate(end).format(end.length > 10 ? `${dateF} ${timeF}` : dateF)}`}
    </div>
  )
}

export default TableDateField
