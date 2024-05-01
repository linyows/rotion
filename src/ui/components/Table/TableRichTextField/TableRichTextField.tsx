import React from 'react'
import { RichText } from '../../RichText'
import type { TableRichTextFieldProps } from './TableRichTextField.types'
import './TableRichTextField.css'

const TableRichTextField = ({ payload }: TableRichTextFieldProps) => {
  if (!payload) {
    return <></>
  }

  return (
    <div className="rotion-table-richtext">
      <RichText textObject={payload.rich_text} />
    </div>
  )
}

export default TableRichTextField
