import React from 'react'
import Handler from '../PageHandler'
import type { ListBlockProps } from './ListBlock.types'

export const ListBlock = ({ tag, blocks, href, link, query }: ListBlockProps) => {
  const CustomTag = tag
  return (
    <CustomTag className={`notionate-blocks-list-${tag}`} key={tag + blocks[0].id}>
      {blocks.map(block => Handler({ block, href, link, query }))}
    </CustomTag>
  )
}

export default ListBlock
