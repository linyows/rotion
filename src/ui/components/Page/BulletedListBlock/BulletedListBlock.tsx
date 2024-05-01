import React from 'react'
import type { BulletedListBlockProps } from './BulletedListBlock.types'
import { RichText } from '../../RichText'
import { blockType } from '../PageHandler'
import Page from '../Page'
import '../../tokens.css'
import './BulletedListBlock.css'

const BulletedListBlock = ({ block, href, link, query }: BulletedListBlockProps) => {
  const CustomTag = blockType[block.type] as keyof JSX.IntrinsicElements

  // @ts-ignore
  const text = block[block.type]?.rich_text

  if (block.has_children && block.children !== undefined) {
    return (
      <CustomTag key={block.id} className="rotion-bulleted-list">
        {text.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
        <Page blocks={block.children} href={href} link={link} query={query} />
      </CustomTag>
    )
  }

  return (
    <CustomTag className="rotion-bulleted-list">
      {text.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </CustomTag>
  )
}

export default BulletedListBlock
