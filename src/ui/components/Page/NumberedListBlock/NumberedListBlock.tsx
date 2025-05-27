import React, { JSX } from 'react'
import type { NumberedListBlockProps } from './NumberedListBlock.types'
import { RichText } from '../../RichText'
import { blockType } from '../PageHandler'
import Page from '../Page'
import '../../tokens.css'
import './NumberedListBlock.css'

const NumberedListBlock = ({ block, href, link, query }: NumberedListBlockProps) => {
  const CustomTag = blockType[block.type] as keyof JSX.IntrinsicElements

  // @ts-ignore
  const text = block[block.type]?.rich_text

  if (block.has_children && block.children !== undefined) {
    return (
      <CustomTag key={block.id} className="rotion-numbered-list">
        {text.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
        <Page blocks={block.children} href={href} link={link} query={query} />
      </CustomTag>
    )
  }

  return (
    <CustomTag className="rotion-numbered-list">
      {text.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </CustomTag>
  )
}

export default NumberedListBlock
