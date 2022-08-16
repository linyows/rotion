import React from 'react'
import type {
  RichTextPropertyItemObjectResponse,
} from '../../types'

export type RichTextProps = {
  payload: RichTextPropertyItemObjectResponse
}

export const DBRichTextField: React.FC<RichTextProps> = ({ payload }) => {
  return (
    <div>
      {payload.rich_text}
    </div>
  )
}

export default DBRichTextField
