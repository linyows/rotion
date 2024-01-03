import React from 'react'
import type {
  RichTextPropertyItemObjectResponse,
} from 'notionate-pages'
import TextBlock from '../page/text'

export type ListRichTextProps = {
  payload: RichTextPropertyItemObjectResponse
}

export const ListRichTextField: React.FC<ListRichTextProps> = ({ payload }) => {
  return (
    <div className="notionate-list-richtext">
      <TextBlock tag="span" block={[payload.rich_text]} />
    </div>
  )
}

export default ListRichTextField
