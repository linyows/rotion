import React from 'react'
import type {
  ChildPageBlockObjectResponseEx,
} from '../../types'

export type ChildpageBlockProps = {
  block: ChildPageBlockObjectResponseEx
}

const ChildpageBlock: React.FC<ChildpageBlockProps> = ({ block }) => {
  const icon = block.page.icon.type === 'emoji' ? block.page.icon.emoji : ''
  return (
    <div className="childpage">
      <span className="childpage-icon">
        {icon}
      </span>
      <span className="childpage-title">
        {block.child_page.title}
      </span>
      <style jsx>{`
        .childpage {
          display: grid;
          width: 100%;
          grid-template: repeat(1, 1fr) / 1rem 1fr;
          gap: .8rem;
        }
      `}</style>
    </div>
  )
}

export default ChildpageBlock
