import React from 'react'
import LinkIfLinked from '../LinkIfLinked/LinkIfLinked'
import Annotation from '../Annotation/Annotation'
import type { TextProps } from './Text.types'

const Text = ({ textObject }: TextProps) => {
  const { href, plain_text } = textObject

  return (
    <LinkIfLinked condition={href !== null} textObject={textObject}>
      <Annotation textObject={textObject}>
        {plain_text}
      </Annotation>
    </LinkIfLinked>
  )
}

export default Text
