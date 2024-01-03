import React from 'react'
import Blocks from './blocks'
import { Link } from '../types'
import type {
  ColumnListBlockObjectResponseEx,
} from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type ColumnlistBlockProps = {
  block: ColumnListBlockObjectResponseEx
  href?: string
  link?: Link
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
