import React from 'react'
import RichText from '../../RichText/RichText'
import type { RichTextItemResponse } from '../../../../exporter'
import type { TextBlockProps } from './TextBlock.types'
import '../../tokens.css'
import './TextBlock.css'

const TextBlock = ({ tag, block }: TextBlockProps) => {
  if (block.type === 'divider') {
    return (
      <div className="rotion-text-hr">
      </div>
    )
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
  // @ts-ignore
  const richText: RichTextItemResponse[] = block[block.type].rich_text

  return (
    <CustomTag className={css.join(' ')}>
      {richText.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </CustomTag>
  )
}

export default TextBlock
