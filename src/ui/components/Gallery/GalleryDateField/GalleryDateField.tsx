import React, { useEffect, useState } from 'react'
import { cdate } from 'cdate'
import type { GalleryDateFieldProps } from './DateField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'
import { getDatetimeFormat } from '../../lib'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    width: '100%',
    padding: '5px 10px 0',
    display: 'flex',
    alignItems: 'center',
    fontSize: '.8rem',
    whiteSpace: 'nowrap',
  },
})

const GalleryDateField = ({ payload }: GalleryDateFieldProps) => {
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
    <div className={`rotion-gallery-date ${Stylex(style.wrapper)}`}>
      {startDate}
      {end && ` → ${endDate}`}
    </div>
  )
}

export default GalleryDateField
