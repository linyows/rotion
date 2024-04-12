import React from 'react'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'
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

const GalleryNumberField = ({ payload }: GalleryNumberFieldProps) => {
  return (
    <div className={`rotion-gallery-number ${Stylex(style.wrapper)}`}>
      {payload.number}
    </div>
  )
}

export default GalleryNumberField
