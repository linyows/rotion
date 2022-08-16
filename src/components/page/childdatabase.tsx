import React from 'react'
import { TextBlock } from './text'
import type {
  ChildDatabaseBlockObjectResponseEx,
} from '../../types'

export type ChilddatabaseBlockProps = {
  block: ChildDatabaseBlockObjectResponseEx
}

const ChilddatabaseBlock: React.FC<ChilddatabaseBlockProps> = ({ block }) => {
  const icon = ('icon' in block.database) && block.database.icon?.type === 'emoji' ? block.database.icon.emoji : ''
  const title = ('title' in block.database) ? block.database.title : []
  return (
    <div className="childdatabase">
      <span className="childdatabase-icon">
        {icon}
      </span>
      {TextBlock({ tag: 'span', block: title })}
      <style jsx>{`
        .childdatabase {
          padding-top: .5rem;
          display: grid;
          width: 100%;
          grid-template: repeat(1, 1fr) / 1rem 1fr;
          gap: .8rem;
        }
      `}</style>
    </div>
  )
}

export default ChilddatabaseBlock
