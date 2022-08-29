import React from 'react'
import Blocks from './blocks'
import type {
  ColumnListBlockObjectResponseEx,
} from '../../server/types'

export type ColumnlistBlockProps = {
  block: ColumnListBlockObjectResponseEx
}

const ColumnlistBlock: React.FC<ColumnlistBlockProps> = ({ block }) => {
  const columns = block.columns.map((v, i) => {
    return (
      <div key={i} className="notionate-blocks-columnlist-inner">
        {Blocks({ blocks: v })}
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
