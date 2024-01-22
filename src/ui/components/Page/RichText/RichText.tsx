import React from 'react'
import Mention from './Mention/Mention'
import Text from './Text/Text'
import Equation from './Equation/Equation'
import type { RichTextProps } from './RichText.types'
import { MentionRichTextItemResponseEx } from '../../../../exporter'

const RichText = ({ textObject }: RichTextProps) => {
  if (textObject === undefined || textObject === null) {
    return <></>
  }

  const { type, plain_text } = textObject

  switch (type) {
    case 'text':
      return (
        <Text textObject={textObject}>
          {plain_text}
        </Text>
      )
    case 'mention':
      return (
        <Mention textObject={textObject as MentionRichTextItemResponseEx}>
          {plain_text}
        </Mention>
      )
    case 'equation':
      return (
        <Equation textObject={textObject}>
          {plain_text}
        </Equation>
      )
    default:
      return <></>
  }
}

export default RichText
