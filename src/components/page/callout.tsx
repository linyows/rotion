import React from 'react'
import TextBlock from './text'
import type {
  CalloutBlockObjectResponse,
} from '../../types'

export type CalloutBlockProps = {
  block: CalloutBlockObjectResponse
}

const CalloutBlock: React.FC<CalloutBlockProps> = ({ block }) => {
  const icon = block.callout.icon?.type === 'emoji' ? block.callout.icon?.emoji : ''
  const text = block.callout.rich_text
  return (
    <>
      <div className="callout">
        <div className="callout-emoji">
          {icon}
        </div>
        <div className="callout-text">
          <TextBlock tag="span" block={text} key={`${block.id}-span`} />
        </div>
      </div>
      <style jsx>{`
        .callout {
            display: flex;
            padding: 1.2rem;
            padding-left: 1rem;
            width: 100%;
            border-radius: 3px;
            background-color: #EEE;
        }
        .callout-text {
            margin-left: .6rem;
        }
      `}</style>
    </>
  )
}

export default CalloutBlock
