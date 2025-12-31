import type { MentionRichTextItemResponseEx } from '../../../exporter/index.js'
import Equation from './Equation/Equation.js'
import Mention from './Mention/Mention.js'
import type { RichTextProps } from './RichText.types'
import Text from './Text/Text.js'

const RichText = ({ textObject }: RichTextProps) => {
  if (!textObject) {
    return null
  }

  const { type, plain_text } = textObject

  switch (type) {
    case 'text':
      return <Text textObject={textObject} />
    case 'mention':
      return <Mention textObject={textObject as MentionRichTextItemResponseEx}>{plain_text}</Mention>
    case 'equation':
      return <Equation textObject={textObject} />
    default:
      return null
  }
}

export default RichText
