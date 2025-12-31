import type { RichTextItemResponse } from '../../../../exporter/index.js'
import RichText from '../../RichText/RichText.js'
import { GenHtmlId } from '../../TableOfContents/index.js'
import type { TextBlockProps } from './TextBlock.types'
import '../../tokens.css'
import './TextBlock.css'

const TextBlock = ({ tag, block }: TextBlockProps) => {
  if (block.type === 'divider') {
    return <div className="rotion-text-hr"></div>
  }

  const styles = {
    hr: 'hr',
    heading_1: 'h1',
    heading_2: 'h2',
    heading_3: 'h3',
    paragraph: 'p',
    quote: 'quote',
  }

  const CustomTag = tag
  const css = ['rotion-text']
  if (block.type in styles) {
    css.push(`rotion-text-${styles[block.type]}`)
  }
  // @ts-expect-error
  const richText: RichTextItemResponse[] = block[block.type].rich_text

  // Add id attribute for headings using first 7 characters of block id
  const isHeading = ['heading_1', 'heading_2', 'heading_3'].includes(block.type)

  return (
    <CustomTag className={css.join(' ')} {...(isHeading && { id: GenHtmlId(block.id) })}>
      {richText.map((v, i) => (
        <RichText textObject={v} key={`${v.plain_text || 'empty'}-${i}`} />
      ))}
    </CustomTag>
  )
}

export default TextBlock
