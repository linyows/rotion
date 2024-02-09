import React from 'react'
import { RichText } from '../../Page/RichText'
import type { TableRichTextFieldProps } from './TableRichTextField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    fontSize: '.85rem',
    whiteSpace: 'nowrap',
    display: 'block',
    margin: 0,
    padding: 0,
    color: '#777',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
})

const TableRichTextField = ({ payload }: TableRichTextFieldProps) => {
  if (!payload) {
    return <></>
  }

  return (
    <div className={`rotion-table-richtext ${Stylex(style.wrapper)}`}>
      <RichText textObject={payload.rich_text} />
    </div>
  )
}

export default TableRichTextField
