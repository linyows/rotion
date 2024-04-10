import React from 'react'
import type { GalleryDateFieldProps } from './DateField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

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
  return (
    <div className={`rotion-gallery-date ${Stylex(style.wrapper)}`}>
      {payload?.start}
    </div>
  )
}

export default GalleryDateField
