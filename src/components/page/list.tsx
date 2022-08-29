import React from 'react'
import BlockHandler from './handler'
import type { BlockObjectResponse } from '../../server/types'

export type ListProps = {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
}

export const List = ({ tag, blocks }: ListProps) => {
  const CustomTag = tag
  return (
    <CustomTag className={`notionate-blocks-list-${tag}`} key={tag + blocks[0].id}>
      {blocks.map(block => (
        BlockHandler({ block })
      ))}
    </CustomTag>
  )
}

export default List
