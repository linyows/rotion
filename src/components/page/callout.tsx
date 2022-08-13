import React from 'react'
import TextBlock from './text'
import type {
  BlockObjectResponse,
} from '../../types'

export type CalloutBlockProps = {
  block: BlockObjectResponse
}

const CalloutBlock = ({ block }): React.FC<CalloutBlockProps> => {
  return (
    <>
      <div className="callout">
        <div className="callout-emoji">
          {block.callout.icon.emoji}
        </div>
        <div className="callout-text">
          <TextBlock tag="span" block={block.callout.text} key={`${block.id}-span`} />
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
