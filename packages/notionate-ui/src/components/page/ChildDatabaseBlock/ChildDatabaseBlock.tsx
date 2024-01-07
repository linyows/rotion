import React from 'react'
import type { ChildDatabaseBlockProps } from './ChildDatabaseBlock.types'
import ChildDatabaseLinkedTitle from './ChildDatabaseLinkedTitle'

const ChildDatabaseBlock = ({ block, href, link, query }: ChildDatabaseBlockProps) => {
  if (!('database' in block)) {
    return <></>
  }
  const icon = ('icon' in block.database) && block.database.icon?.type === 'emoji' ? block.database.icon.emoji : ''
  return (
    <div className="notionate-blocks-childdatabase">
      <span>
        {icon}
      </span>
      <div>
        {ChildDatabaseLinkedTitle({ block, href, link, query })}
      </div>
    </div>
  )
}

export default ChildDatabaseBlock
