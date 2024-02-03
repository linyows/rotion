import React from 'react'
import type { BlockObjectResponse } from '../../../../exporter'
import type { NumberedListBlockProps } from './NumberedListBlock.types'
import { RichText } from '../RichText'
import PageHandler, { blockType } from '../PageHandler'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    padding: '.1rem 0 .1rem .3rem',
    margin: 0,
    lineHeight: 1.5,
  },
})

const NumberedListBlock = ({ block, href, link, query }: NumberedListBlockProps) => {
  const CustomTag = blockType[block.type] as keyof JSX.IntrinsicElements
  // @ts-ignore
  const text = block[block.type]?.rich_text
  if (block.has_children && block.children !== undefined) {
    return (
      <div key={block.id}>
        <CustomTag className={`rotion-numbered-list ${Stylex(style.wrapper)}`}>
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
    <CustomTag className={`rotion-numbered-list ${Stylex(style.wrapper)}`}>
      {text.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </CustomTag>
  )
}

export default NumberedListBlock
