import type { JSX } from 'react'
import type { BlockObjectResponse } from '../../../exporter/index.js'
import { ListBlocks } from './ListBlocks/index.js'
import type { ListType, PageProps, ULOL } from './Page.types'
import PageHandler from './PageHandler.js'

export const Page = ({ blocks, href, link, query, breadcrumb_hrefs }: PageProps) => {
  const { results } = blocks
  const listType: ListType = {
    bulleted_list_item: 'ul',
    numbered_list_item: 'ol',
  }
  const listTag = Object.keys(listType)
  let isListTag = false
  const children: JSX.Element[] = []
  let list: BlockObjectResponse[] = []
  const isListContinue = (i: number) => {
    const nextIndex = i + 1
    return listTag.includes(results[nextIndex]?.type || '')
  }

  results.map((v: BlockObjectResponse, i) => {
    const block = v
    if (listTag.includes(block.type)) {
      // intermediate
      if (isListTag && isListContinue(i)) {
        list.push(block)
        // last or (first and last)
      } else if (isListTag || !isListContinue(i)) {
        isListTag = false
        list.push(block)
        if (Object.keys(listType).includes(block.type)) {
          const tag = listType[block.type] as ULOL
          children.push(<div key={block.id}>{ListBlocks({ tag, blocks: list, href, link, query })}</div>)
          list = []
        }
        // first
      } else {
        isListTag = true
        list.push(block)
      }
    } else {
      const elem = PageHandler({ block, href, link, query, breadcrumb_hrefs })
      children.push(<div key={block.id}>{elem}</div>)
    }
    return ''
  })

  return <div className="rotion-blocks">{children}</div>
}

export default Page
