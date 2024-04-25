import React from 'react'
import PageHandler from '../PageHandler'
import type { ListBlocksProps } from './ListBlocks.types'

export const ListBlocks = ({ tag, blocks, href, link, query }: ListBlocksProps) => {
  const CustomTag = tag
  // This is calling BulletedListBlock or NumberedListBlock with PageHandler
  return (
    <CustomTag className={`rotion-listblocks rotion-list-${tag}`} key={tag + blocks[0].id}>
      {blocks.map(block => PageHandler({ block, href, link, query }))}
    </CustomTag>
  )
}

export default ListBlocks
