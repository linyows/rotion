import React from 'react'
import Mention from './Mention'
import Text from './Text'
import Equation from './Equation'
import type { RichTextProps } from './RichText.types'

const RichText = ({ textObject }: RichTextProps) => {
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
        <Mention textObject={textObject}>
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
