import React from 'react'
import TextBlock from './text'
import type {
  CalloutBlockObjectResponse,
} from 'notionate-pages'

export type CalloutBlockProps = {
  block: CalloutBlockObjectResponse
}

const CalloutBlock: React.FC<CalloutBlockProps> = ({ block }) => {
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
