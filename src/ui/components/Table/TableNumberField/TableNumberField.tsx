import React from 'react'
import type { TableNumberFieldProps } from './TableNumberField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    whiteSpace: 'nowrap',
    fontSize: '.85rem',
    display: 'block',
    width: '100%',
    textAlign: 'right',
  },
})

const TableNumberField = ({ payload }: TableNumberFieldProps) => {
  return (
    <div className={`rotion-table-number ${Stylex(style.wrapper)}`}>
      {payload.number}
    </div>
  )
}

export default TableNumberField
