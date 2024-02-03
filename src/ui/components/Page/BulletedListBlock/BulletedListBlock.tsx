import React from 'react'
import type { BlockObjectResponse } from '../../../../exporter'
import type { BulletedListBlockProps } from './BulletedListBlock.types'
import { RichText } from '../RichText'
import PageHandler, { blockType } from '../PageHandler'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    lineHeight: 1.7,
    padding: '1rem 0 0 1rem',
    margin: '0 0 0 .3rem',
  },
})

const BulletedListBlock = ({ block, href, link, query }: BulletedListBlockProps) => {
  const CustomTag = blockType[block.type] as keyof JSX.IntrinsicElements

  // @ts-ignore
  const text = block[block.type]?.rich_text

  if (block.has_children && block.children !== undefined) {
    return (
      <div key={block.id}>
        <CustomTag className={`rotion-bulleted-list ${Stylex(style.wrapper)}`}>
          {text.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </CustomTag>
        {block.children.results.map((bb) => (
          PageHandler({ block: (bb as BlockObjectResponse), href, link, query })
        ))}
      </div>
    )
  }

  return (
    <CustomTag className={`rotion-bulleted-list ${Stylex(style.wrapper)}`}>
      {text.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </CustomTag>
  )
}

export default BulletedListBlock
