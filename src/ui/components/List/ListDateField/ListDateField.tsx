import React, { useEffect, useState } from 'react'
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
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const { dateF, timeF } = getDatetimeFormat(window?.navigator?.language)
    setStartDate(cdate(start).format(start.length > 10 ? `${dateF} ${timeF}` : dateF))
    if (end) {
      setEndDate(cdate(end).format(end.length > 10 ? `${dateF} ${timeF}` : dateF))
    }
  }, [startDate, endDate])

  return (
    <div className={`rotion-list-date ${Stylex(style.wrapper)}`}>
      {startDate}
      {end && ` → ${endDate}`}
    </div>
  )
}

export default ListDateField
