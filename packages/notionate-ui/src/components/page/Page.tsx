import React from 'react'
import type { BlockObjectResponse } from 'notionate-pages'
import type { PageProps, ListType } from './Page.types'
import ListBlock from './ListBlock'
import PageHandler from './PageHandler'

export const Page = ({ blocks, href, link, query, modules }: PageProps) => {
  const { results } = blocks
  const listType: ListType = {
    bulleted_list_item: 'ul',
    numbered_list_item: 'ol',
  }
  const listTag = Object.keys(listType)
  let isListTag = false
  const children: JSX.Element[] = []
  let list: BlockObjectResponse[] = []

  results.map((v: BlockObjectResponse, i) => {
    const block = v
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
      const elem = PageHandler({ block, href, link, query, modules })
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

export default Page
