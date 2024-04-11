import React from 'react'
import { cdate } from 'cdate'
import type { ListDateFieldProps } from './ListDateField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'
import { getDatetimeFormat } from '../../lib'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    whiteSpace: 'nowrap',
    fontSize: '.85rem',
    display: 'flex',
    margin: '0 7px',
    minWidth: '20px',
    color: tokens.thirdText,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
})

const ListDateField = ({ payload }: ListDateFieldProps) => {
  if (payload === null) {
    return <></>
  }

  const { start, end } = payload
  const { dateF, timeF } = getDatetimeFormat()
  return (
    <div className={`rotion-list-date ${Stylex(style.wrapper)}`}>
      {cdate(start).format(start.length > 10 ? `${dateF} ${timeF}` : dateF)}
      {end && ` → ${cdate(end).format(end.length > 10 ? `${dateF} ${timeF}` : dateF)}`}
    </div>
  )
}

export default ListDateField
