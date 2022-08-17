import React from 'react'
import Link from 'next/link'
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
  const plainTitle = title.map(v => v.plain_text).join('').toLowerCase()
  return (
    <div className="childdatabase">
      <span className="childdatabase-icon">
        {icon}
      </span>
      <div>
        <Link href={`/${encodeURIComponent(plainTitle)}`}>
          <a className="childdatabase-anchor">
            {TextBlock({ tag: 'span', block: title })}
          </a>
        </Link>
      </div>
      <style jsx>{`
        .childdatabase {
          display: grid;
          width: 100%;
          grid-template: repeat(1, 1fr) / 1rem 1fr;
          gap: .8rem;
        }
        .childdatabase-anchor {
          color: #333;
          border-bottom: 1px solid #ddd;
          display: inline;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default ChilddatabaseBlock
