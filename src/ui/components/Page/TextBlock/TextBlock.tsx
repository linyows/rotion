import React from 'react'
import RichText from '../RichText/RichText'
import type { RichTextItemResponse } from '../../../../exporter'
import type { TextBlockProps } from './TextBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
  },
  hr: {
    margin: '1rem 0',
    borderTopColor: '#ddd',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    width: '100%',
    height: '1px',
  },
  heading_1: {
    lineHeight: 1.3,
    margin: 0,
    padding: '3rem 0 3px',
  },
  heading_2: {
    lineHeight: 1.3,
    margin: 0,
    padding: '2rem 0 3px',
  },
  heading_3: {
    lineHeight: 1.3,
    margin: 0,
    padding: '1.6rem 0 3px',
  },
  paragraph: {
    padding: '.6rem 0',
    margin: 0,
    lineHeight: 1.5,
  },
  quote: {
    borderLeft: '3px solid currentcolor',
    paddingLeft: '1rem',
    marginLeft: 0,
    marginRight: 0,
    lineHeight: 1.7,
  },
})

const TextBlock = ({ tag, block }: TextBlockProps) => {
  if (block.type === 'divider') {
    return (
      <div className={`rotion-text-hr ${Stylex(style.hr)}`}>
      </div>
    )
  }

  const CustomTag = tag
  let css = [Stylex(style.wrapper)]
  if (block.type in style) {
    const styleKey = block.type as keyof typeof style
    css.push(`${Stylex(style[styleKey])}`)
  }
  // @ts-ignore
  const richText: RichTextItemResponse[] = block[block.type].rich_text

  return (
    <CustomTag className={`rotion-text-${tag} ${css.join(' ')}`}>
      {richText.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </CustomTag>
  )
}

export default TextBlock
