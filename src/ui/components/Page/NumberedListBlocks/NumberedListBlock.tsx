import React from 'react'
import type { NumberedListBlockProps } from './NumberedListBlock.types'
import { RichText } from '../RichText'
import { blockType } from '../PageHandler'
import Page from '../Page'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    lineHeight: tokens.lineHeight,
    padding: '.2rem 0 .2rem .3rem',
    margin: 0,
  },
})

const NumberedListBlock = ({ block, href, link, query }: NumberedListBlockProps) => {
  const CustomTag = blockType[block.type] as keyof JSX.IntrinsicElements

  // @ts-ignore
  const text = block[block.type]?.rich_text

  if (block.has_children && block.children !== undefined) {
    return (
      <CustomTag key={block.id} className={`rotion-numbered-list ${Stylex(style.wrapper)}`}>
        {text.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
        <Page blocks={block.children} href={href} link={link} query={query} />
      </CustomTag>
    )
  }

  return (
    <CustomTag className={`rotion-numbered-list ${Stylex(style.wrapper)}`}>
      {text.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </CustomTag>
  )
}

export default NumberedListBlock
