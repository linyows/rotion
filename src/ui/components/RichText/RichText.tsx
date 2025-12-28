import React from 'react'
import Mention from './Mention/Mention.js'
import Text from './Text/Text.js'
import Equation from './Equation/Equation.js'
import type { RichTextProps } from './RichText.types'
import { MentionRichTextItemResponseEx } from '../../../exporter/index.js'

const RichText = ({ textObject }: RichTextProps) => {
  if (!textObject) {
    return <></>
  }

  const { type, plain_text } = textObject

  switch (type) {
    case 'text':
      return <Text textObject={textObject} />
    case 'mention':
      return (
        <Mention textObject={textObject as MentionRichTextItemResponseEx}>
          {plain_text}
        </Mention>
      )
    case 'equation':
      return <Equation textObject={textObject} />
    default:
      return <></>
  }
}

export default RichText
