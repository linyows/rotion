import React from 'react'
import type { ChildPageBlockProps } from './ChildPageBlock.types'
import ChildPageLinkedTitle from './ChildPageLinkedTitle'

const ChildPageBlock = ({ block, href, link, query }: ChildPageBlockProps) => {
  const icon = 'icon' in block.page && block.page.icon.type === 'emoji' ? block.page.icon.emoji : ''

  return (
    <div className="notionate-blocks-childpage">
      {icon}
      <div>
        {ChildPageLinkedTitle({ block, href, link })}
      </div>
    </div>
  )
}

export default ChildPageBlock
