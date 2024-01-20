import React from 'react'
import TextBlock from '../TextBlock/TextBlock'
import type { CalloutBlockProps } from './CalloutBlock.types'

const Icon = ({ block }: CalloutBlockProps) => {
  if (block.callout.icon === null) {
    return <> </>
  }

  const { type } = block.callout.icon
  switch (type) {
    case 'emoji':
      return <>{block.callout.icon.emoji}</>
    case 'external':
    case 'file':
      return <img src={block.callout.icon.src} alt="Icon" />
    default:
      return <> </>
  }
}

const CalloutBlock = ({ block }: CalloutBlockProps) => {
  const { rich_text } = block.callout

  return (
    <div className="notionate-blocks-callout">
      <div className="notionate-blocks-callout-icon">
        {<Icon block={block} />}
      </div>
      <div className="notionate-blocks-callout-text">
        <TextBlock tag="span" block={rich_text} key={`${block.id}-span`} />
      </div>
    </div>
  )
}

export default CalloutBlock
