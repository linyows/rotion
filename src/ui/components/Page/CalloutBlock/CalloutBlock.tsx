import React from 'react'
import { RichText } from '../../RichText'
import Page from '../Page'
import type { CalloutBlockProps } from './CalloutBlock.types'
import '../../tokens.css'
import './CalloutBlock.css'

const Icon = ({ block }: CalloutBlockProps) => {
  if (!block.callout.icon) {
    return <></>
  }

  const { type } = block.callout.icon
  switch (type) {
    case 'emoji':
      return <span className="rotion-callout-emoji">{block.callout.icon.emoji}</span>
    case 'external':
    case 'file':
      return <img className="rotion-callout-img" src={block.callout.icon.src} alt="Icon" />
    default:
      return <></>
  }
}

const CalloutBlock = ({ block, href, link, query }: CalloutBlockProps) => {
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
        {block.has_children && block.children !== undefined && <Page blocks={block.children} href={href} link={link} query={query} />}
      </div>
    </div>
  )
}

export default CalloutBlock
