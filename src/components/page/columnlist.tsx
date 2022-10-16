import React, { ReactElement } from 'react'
import Blocks from './blocks'
import type {
  ColumnListBlockObjectResponseEx,
} from '../../server/types'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { UrlObject } from 'node:url'

export type ColumnlistBlockProps = {
  block: ColumnListBlockObjectResponseEx
  href?: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string | UrlObject}>
  query?: ParsedUrlQueryInput
}

const ColumnlistBlock: React.FC<ColumnlistBlockProps> = ({ block, href, link, query }) => {
  const columns = block.columns.map((v, i) => {
    return (
      <div key={i} className="notionate-blocks-columnlist-inner">
        {Blocks({ blocks: v, href, link, query })}
      </div>
    )
  })
  const l = columns.length
  const columnlistStyle = {
    gridTemplate: `repeat(1, 1fr) / repeat(${l}, 1fr)`,
  }

  return (
    <div className="notionate-blocks-columnlist" style={columnlistStyle}>
      {columns}
    </div>
  )
}

export default ColumnlistBlock
