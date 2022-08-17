import React from 'react'
import Link from 'next/link'
import type {
  ChildPageBlockObjectResponseEx,
} from '../../types'

export type ChildpageBlockProps = {
  block: ChildPageBlockObjectResponseEx
}

const ChildpageBlock: React.FC<ChildpageBlockProps> = ({ block }) => {
  const icon = block.page.icon.type === 'emoji' ? block.page.icon.emoji : ''
  const title = block.child_page.title
  return (
    <div className="childpage">
      <span className="childpage-icon">
        {icon}
      </span>
      <div>
        <Link href={`/${encodeURIComponent(title.toLowerCase())}`}>
          <a className="childpage-anchor">
            {title}
          </a>
        </Link>
      </div>
      <style jsx>{`
        .childpage {
          display: grid;
          width: 100%;
          grid-template: repeat(1, 1fr) / 1rem 1fr;
          gap: .8rem;
        }
        .childpage-anchor {
          color: #333;
          border-bottom: 1px solid #ddd;
          display: inline;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default ChildpageBlock
