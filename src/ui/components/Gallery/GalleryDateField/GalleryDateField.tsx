import React from 'react'
import type { GalleryDateFieldProps } from './DateField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    width: '100%',
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
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
