import React from 'react'
import { RichText } from '../../Page/RichText'
import type { ListRichTextFieldProps } from './ListRichTextField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    fontSize: '.85rem',
    whiteSpace: 'nowrap',
    display: 'block',
    margin: '0 .5rem',
    padding: '0 .5rem',
    maxWidth: '25rem',
    color: '#777',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
})

const ListRichTextField = ({ payload }: ListRichTextFieldProps) => {
  return (
    <div className={`rotion-list-richtext ${Stylex(style.wrapper)}`}>
      <RichText textObject={payload.rich_text} />
    </div>
  )
}

export default ListRichTextField
