import React from 'react'
import Blocks from './blocks'
import type {
  BlockObjectResponse,
} from '../../types'

export type ColumnlistBlockProps = {
  block: BlockObjectResponse
}

const ColumnlistBlock = ({ block }): React.FC<ColumnlistBlockProps> => {
  const columns = block.columns.map((v, i) => {
    return (
      <div key={i} className="columnlist-inner">
        <Blocks blocks={v} />
        <style jsx>{`
          .columnlist-inner {
            margin: 0 0 1rem;
          }
        `}</style>
      </div>
    )
  })
  const l = columns.length

  return (
    <div className="columnlist">
      {columns}
      <style jsx>{`
        .columnlist {
          width: 100%;
          margin: 1rem 0;
          display: grid;
          grid-template: repeat(1, 1fr) / repeat(${l}, 1fr);
          gap: 5%;
        }
      `}</style>
    </div>
  )
}

export default ColumnlistBlock
