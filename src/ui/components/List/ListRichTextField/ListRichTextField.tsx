import React from 'react'
import { RichText } from '../../RichText'
import type { ListRichTextFieldProps } from './ListRichTextField.types'

const ListRichTextField = ({ payload }: ListRichTextFieldProps) => {
  return (
    <div className="rotion-list-richtext">
      <RichText textObject={payload.rich_text} />
    </div>
  )
}

export default ListRichTextField
