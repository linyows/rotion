import React from 'react'
import Page from '../Page'
import type { ColumnListBlockProps } from './ColumnListBlock.types'

const ColumnListBlock = ({ block, href, link, query }: ColumnListBlockProps) => {
  const columns = block.columns.map((v, i) => {
    return (
      <div key={i} className="notionate-blocks-columnlist-inner">
        {Page({ blocks: v, href, link, query })}
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

export default ColumnListBlock
