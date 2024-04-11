import React from 'react'
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
  const { dateF, timeF } = getDatetimeFormat()
  return (
    <div className={`rotion-gallery-date ${Stylex(style.wrapper)}`}>
      {cdate(start).format(start.length > 10 ? `${dateF} ${timeF}` : dateF)}
      {end && ` → ${cdate(end).format(end.length > 10 ? `${dateF} ${timeF}` : dateF)}`}
    </div>
  )
}

export default GalleryDateField
