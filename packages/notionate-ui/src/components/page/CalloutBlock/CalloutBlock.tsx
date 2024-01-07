import React from 'react'
import TextBlock from '../TextBlock/TextBlock'
import type { CalloutBlockProps } from './CalloutBlock.types'

const CalloutBlock = ({ block }: CalloutBlockProps) => {
  const icon = block.callout.icon?.type === 'emoji' ? block.callout.icon?.emoji : ''
  const text = block.callout.rich_text

  return (
    <div className="notionate-blocks-callout">
      <div>
        {icon}
      </div>
      <div className="notionate-blocks-callout-text">
        <TextBlock tag="span" block={text} key={`${block.id}-span`} />
      </div>
    </div>
  )
}

export default CalloutBlock
