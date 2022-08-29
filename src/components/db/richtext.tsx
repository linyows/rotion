import React from 'react'
import type {
  RichTextPropertyItemObjectResponse,
} from '../../server/types'
import TextBlock from '../page/text'

export type RichTextProps = {
  payload: RichTextPropertyItemObjectResponse
}

export const DBRichTextField: React.FC<RichTextProps> = ({ payload }) => {
  return (
    <div>
      {TextBlock({ tag: 'span', block: [payload.rich_text]})}
    </div>
  )
}

export default DBRichTextField
