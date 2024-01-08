import React from 'react'
import type { ChildPageBlockProps } from './ChildPageBlock.types'
import ChildPageLinkedTitle from './ChildPageLinkedTitle'

const ChildPageBlock = ({ block, href, link }: ChildPageBlockProps) => {
  if (!('icon' in block.page)) {
    return (
      <div className="notionate-blocks-childpage">
        <span>
          {`️-`}
        </span>
        <div>
          {ChildPageLinkedTitle({ block, href, link })}
        </div>
      </div>
    )
  }

  if (block.page.icon.type === 'emoji') {
    return (
      <div className="notionate-blocks-childpage">
        <span>
          {block.page.icon.emoji}
        </span>
        <div>
          {ChildPageLinkedTitle({ block, href, link })}
        </div>
      </div>
    )
  }

  // type external or file
  return (
    <div className="notionate-blocks-childpage">
      <span>
        <img className="notionate-blocks-childpage-file-icon" src={block.page.icon.src} alt="" />
      </span>
      <div>
        {ChildPageLinkedTitle({ block, href, link })}
      </div>
    </div>
  )
}

export default ChildPageBlock
