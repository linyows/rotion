import React from 'react'
import { RichText } from '../../RichText'
import type { TableRichTextFieldProps } from './TableRichTextField.types'
import './TableRichTextField.css'

const TableRichTextField = ({ textObjects }: TableRichTextFieldProps) => {
  if (!textObjects) {
    return <></>
  }

  return (
    <div className="rotion-table-richtext">
      {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
    </div>
  )
}

export default TableRichTextField
