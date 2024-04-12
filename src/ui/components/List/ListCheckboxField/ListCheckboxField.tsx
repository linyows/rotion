import React from 'react'
import type { ListCheckboxFieldProps } from './ListCheckboxField.types'
import { Checkbox } from '../../Checkbox'
import Stylex from '@stylexjs/stylex'
import { link } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    margin: '0 .3rem',
    padding: '0 .3rem',
    backgroundColor: link.bgColor,
  },
})

const ListCheckboxField = ({ payload }: ListCheckboxFieldProps) => {
  return (
    <div className={`rotion-list-checkbox ${Stylex(style.wrapper)}`}>
      <Checkbox bool={payload} />
    </div>
  )
}

export default ListCheckboxField
