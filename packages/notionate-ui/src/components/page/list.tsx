import React from 'react'
import BlockHandler from './handler'
import { Link } from '../types'
import type {
  BlockObjectResponse,
} from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type ListBlockProps = {
  tag: keyof JSX.IntrinsicElements
  blocks: BlockObjectResponse[]
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

export const ListBlock = ({ tag, blocks, href, link, query }: ListBlockProps) => {
  const CustomTag = tag
  return (
    <CustomTag className={`notionate-blocks-list-${tag}`} key={tag + blocks[0].id}>
      {blocks.map(block => BlockHandler({ block, href, link, query }))}
    </CustomTag>
  )
}

export default ListBlock
