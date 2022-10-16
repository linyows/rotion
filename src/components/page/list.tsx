import React, { ReactElement } from 'react'
import BlockHandler from './handler'
import type { BlockObjectResponse } from '../../server/types'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { UrlObject } from 'node:url'

export type ListBlockProps = {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
  href?: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string | UrlObject}>
  query?: ParsedUrlQueryInput
}

export const ListBlock = ({ tag, blocks, href, link, query }: ListBlockProps) => {
  const CustomTag = tag
  return (
    <CustomTag className={`notionate-blocks-list-${tag}`} key={tag + blocks[0].id}>
      {blocks.map(block => (
        BlockHandler({ block, href, link, query })
      ))}
    </CustomTag>
  )
}

export default ListBlock
