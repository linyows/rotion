import Annotation from '../Annotation/Annotation.js'
import LinkIfLinked from '../LinkIfLinked/LinkIfLinked.js'
import type { TextProps } from './Text.types'

const Text = ({ textObject }: TextProps) => {
  const { href } = textObject

  return (
    <LinkIfLinked condition={href !== null} textObject={textObject}>
      <Annotation textObject={textObject} />
    </LinkIfLinked>
  )
}

export default Text
