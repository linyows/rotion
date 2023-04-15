import React from 'react'
import ListBlock from './list'
import BlockHandler, { ExternalModules } from './handler'
import type {
  ListBlockChildrenResponseEx,
  BlockObjectResponse,
  Link,
} from '../../server/types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type BlocksProps = {
  blocks: ListBlockChildrenResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  modules?: ExternalModules
}

type ListType = {
  [key: string]: string
}

export const Blocks: React.FC<BlocksProps> = ({ blocks, href, link, query, modules }) => {
  const { results } = blocks
  const listType: ListType = {
    bulleted_list_item: 'ul',
    numbered_list_item: 'ol',
  }
  const listTag = Object.keys(listType)
  let isListTag = false
  const children: JSX.Element[] = []
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
          children.push(ListBlock({ tag, blocks: list, href, link, query }))
          list = []
        }
      // first
      } else {
        isListTag = true
        list.push(block)
      }
    } else {
      const elem = BlockHandler({ block, href, link, query, modules })
      if (elem !== undefined) {
        children.push(elem)
      }
    }
    return ''
  })

  return (
    <div className="notionate-blocks">
      {children}
    </div>
  )
}

export default Blocks
