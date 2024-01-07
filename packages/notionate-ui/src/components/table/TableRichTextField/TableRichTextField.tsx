import React from 'react'
import TextBlock from '../../Page/TextBlock'
import type { TableRichTextFieldProps } from './TableRichTextField.types'

const TableRichTextField = ({ payload }: TableRichTextFieldProps) => {
  return (
    <div className="notionate-table-richtext">
      {payload && <TextBlock tag="span" block={[payload.rich_text]} />}
    </div>
  )
}

export default TableRichTextField
