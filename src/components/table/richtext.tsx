import React from 'react'
import type {
  RichTextPropertyItemObjectResponse,
} from '../../server/types'
import TextBlock from '../page/text'

export type TableRichTextProps = {
  payload?: RichTextPropertyItemObjectResponse
}

export const TableRichTextField: React.FC<TableRichTextProps> = ({ payload }) => {
  return (
    <div className="notionate-table-richtext">
      {payload && <TextBlock tag="span" block={[payload.rich_text]} />}
    </div>
  )
}

export default TableRichTextField
