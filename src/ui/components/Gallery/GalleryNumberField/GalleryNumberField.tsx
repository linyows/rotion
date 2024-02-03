import React from 'react'
import type { GalleryNumberFieldProps } from './GalleryNumberField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    width: '100%',
    padding: '0 10px 8px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
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
