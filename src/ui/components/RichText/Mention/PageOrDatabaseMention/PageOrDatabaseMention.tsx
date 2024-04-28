import React from 'react'
import PageIcon from '../../../Page/PageIcon/PageIcon'
import type { PageOrDatabaseMentionProps } from './PageOrDatabaseMention.types'

const PageOrDatabaseMention = ({ mention }: PageOrDatabaseMentionProps) => {
  return (
    <span className="rotion-richtext-pageordb">
      <span className="rotion-richtext-pageordb-icon">
        {mention.icon.type === 'emoji' && mention.icon.emoji}
        {mention.icon.type !== 'emoji' && <img src={mention.icon.src} className="rotion-richtext-pageordb-img" alt="icon" />}
        <PageIcon name="link" className="rotion-richtext-pageordb-arrow" />
      </span>
      <span className="rotion-richtext-pageordb-title">
        {mention.name}
      </span>
    </span>
  )
}

export default PageOrDatabaseMention
