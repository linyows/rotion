import React from 'react'
import PageHandler from '../PageHandler'
import type { ListBlocksProps } from './ListBlocks.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    lineHeight: tokens.lineHeight,
    padding: '.2rem 0 .2rem 1rem',
    margin: 0,
  },
})

export const ListBlocks = ({ tag, blocks, href, link, query }: ListBlocksProps) => {
  const CustomTag = tag
  // This is calling BulletedListBlock or NumberedListBlock with PageHandler
  return (
    <CustomTag className={`rotion-list-${tag} ${Stylex(style.wrapper)}`} key={tag + blocks[0].id}>
      {blocks.map(block => PageHandler({ block, href, link, query }))}
    </CustomTag>
  )
}

export default ListBlocks
