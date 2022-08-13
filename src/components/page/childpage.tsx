import React from 'react'
import type {
  BlockObjectResponse,
} from '../../types'

export type ChildpageBlockProps = {
  block: BlockObjectResponse
}

const ChildpageBlock = ({ block }): React.FC<ChildpageBlockProps> => {
  return (
    <div className="childpage">
      <span className="childpage-icon">
        {block.page.icon.emoji}
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
