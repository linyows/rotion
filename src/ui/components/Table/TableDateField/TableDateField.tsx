import React from 'react'
import type { TableDateFieldProps } from './TableDateField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    whiteSpace: 'nowrap',
    fontSize: '.85rem',
    display: 'flex',
    alignItems: 'center',
    minWidth: '20px',
    color: '#999',
  },
})

const TableDateField = ({ payload }: TableDateFieldProps) => {
  return (
    <div className={`rotion-table-date ${Stylex(style.wrapper)}`}>
      {payload?.start}
    </div>
  )
}

export default TableDateField
