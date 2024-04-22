import React from 'react'
import { RichText } from '../RichText'
import type { CalloutBlockProps } from './CalloutBlock.types'

const Icon = ({ block }: CalloutBlockProps) => {
  if (!block.callout.icon) {
    return <></>
  }

  const { type } = block.callout.icon
  switch (type) {
    case 'emoji':
      return <>{block.callout.icon.emoji}</>
    case 'external':
    case 'file':
      return <img src={block.callout.icon.src} alt="Icon" />
    default:
      return <></>
  }
}

const CalloutBlock = ({ block }: CalloutBlockProps) => {
  const { color, rich_text } = block.callout

  return (
    <div className={`rotion-callout rotion-callout-${color.replace('_background', '-bg')}`}>
      <div className="rotion-callout-icon">
        <Icon block={block} />
      </div>
      <div className="rotion-callout-text">
        {rich_text.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default CalloutBlock
