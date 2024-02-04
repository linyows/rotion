import React from 'react'
import type { ListCheckboxFieldProps } from './ListCheckboxField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
  },
})

const ListCheckboxField = ({ payload }: ListCheckboxFieldProps) => {
  return (
    <div className={`rotion-list-checkbox ${Stylex(style.wrapper)}`}>
      {payload}
    </div>
  )
}

export default ListCheckboxField
