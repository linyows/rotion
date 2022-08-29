import React from 'react'
import Handler from './handler'
import type { BlockObjectResponse } from '../../server/types'

export type ListProps = {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
}

export const List = ({ tag, blocks }: ListProps) => {
  const CustomTag = tag

  return (
    <CustomTag key={tag + blocks[0].id}>
      {blocks.map(block => (
        Handler({ block })
      ))}
    </CustomTag>
  )
}

export default List
