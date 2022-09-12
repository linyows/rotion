import React, { ReactElement } from 'react'
import BlockHandler from './handler'
import type { BlockObjectResponse } from '../../server/types'

export type ListBlockProps = {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
  href?: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
}

export const ListBlock = ({ tag, blocks, href, link }: ListBlockProps) => {
  const CustomTag = tag
  return (
    <CustomTag className={`notionate-blocks-list-${tag}`} key={tag + blocks[0].id}>
      {blocks.map(block => (
        BlockHandler({ block, href, link })
      ))}
    </CustomTag>
  )
}

export default ListBlock
