import React from 'react'
import List from './list'
import Handler from './handler'
import type {
  ListBlockChildrenResponseEx,
  BlockObjectResponse,
} from '../../types'

export type BlocksProps = {
  blocks: ListBlockChildrenResponseEx
}

type ListType = {
  [key: string]: string
}

export const Blocks = ({ blocks }: BlocksProps): JSX.Element[] => {
  const { results } = blocks
  const listType: ListType = {
    bulleted_list_item: 'ul',
    numbered_list_item: 'ol',
  }
  const listTag = Object.keys(listType)
  let isListTag = false
  let children: JSX.Element[] = []
  let list: BlockObjectResponse[] = []

  results.map((v, i) => {
    const block = v as unknown as BlockObjectResponse
    if (listTag.includes(block.type)) {
      // intermediate
      if (isListTag && listTag.includes(results[i + 1]?.type || '')) {
        list.push(block)
      // last or (first and last)
      } else if (isListTag || !listTag.includes(results[i + 1]?.type || '')) {
        isListTag = false
        list.push(block)
        if (Object.keys(listType).includes(block.type)) {
          const tag = listType[block.type] as keyof JSX.IntrinsicElements
          children.push(List({ tag, blocks: list }))
          list = []
        }
      // first
      } else {
        isListTag = true
        list.push(block)
      }
    } else {
      const elem = Handler({ block })
      if (elem !== undefined) {
        children.push(elem)
      }
    }
  })

  return children
}

export default Blocks
