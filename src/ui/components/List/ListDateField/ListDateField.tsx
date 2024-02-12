import React from 'react'
import type { ListDateFieldProps } from './ListDateField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    whiteSpace: 'nowrap',
    fontSize: '.85rem',
    display: 'flex',
    alignItems: 'center',
    margin: '0 7px',
    minWidth: '20px',
    color: '#999',
  },
})

const ListDateField = ({ payload }: ListDateFieldProps) => {
  return (
    <div className={`rotion-list-date ${Stylex(style.wrapper)}`}>
      {payload?.start}
    </div>
  )
}

export default ListDateField
