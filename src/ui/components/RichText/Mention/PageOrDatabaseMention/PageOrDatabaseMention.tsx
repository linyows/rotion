import React from 'react'
import { Icon } from '../../../Icon/index.js'
import type { PageOrDatabaseMentionProps } from './PageOrDatabaseMention.types'
import './PageOrDatabaseMention.css'

const PageOrDatabaseMention = ({ mention }: PageOrDatabaseMentionProps) => {
  return (
    <span className="rotion-richtext-pageordb">
      {mention.icon && (
        <span className="rotion-richtext-pageordb-icon">
          {mention.icon.type === 'emoji' && (mention.icon as any).emoji}
          {mention.icon.type !== 'emoji' && <img src={(mention.icon as any).src} className="rotion-richtext-pageordb-img" alt="icon" />}
          <Icon name="link" className="rotion-richtext-pageordb-arrow" />
        </span>
      )}
      <span className="rotion-richtext-pageordb-title">
        {mention.name}
      </span>
    </span>
  )
}

export default PageOrDatabaseMention
