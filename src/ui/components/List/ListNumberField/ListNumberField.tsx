import React from 'react'
import type { ListNumberFieldProps } from './ListNumberField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    whiteSpace: 'nowrap',
    fontSize: '.85rem',
    display: 'flex',
    alignItems: 'center',
    margin: '0 7px',
    minWidth: '20px',
  },
})

const ListNumberField = ({ payload }: ListNumberFieldProps) => {
  return (
    <div className={`rotion-list-number ${Stylex(style.wrapper)}`}>
      {payload.number}
    </div>
  )
}

export default ListNumberField
