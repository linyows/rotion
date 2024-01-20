import React from 'react'
import TextBlock from '../../Page/TextBlock/TextBlock'
import type { ListRichTextFieldProps } from './ListRichTextField.types'

const ListRichTextField = ({ payload }: ListRichTextFieldProps) => {
  return (
    <div className="notionate-list-richtext">
      <TextBlock tag="span" block={[payload.rich_text]} />
    </div>
  )
}

export default ListRichTextField
