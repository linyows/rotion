import React from 'react'
import PageIcon from '../../../PageIcon/PageIcon'
import type { PageMentionProps } from './PageMention.types'

const PageMention = ({ mention, children }: PageMentionProps) => {
  return (
    <span className={'rotion-mention-page'}>
      <span>
        {mention.icon.type === 'emoji' ? mention.icon.emoji : <img src={mention.icon.src} alt="icon"/>}
        <PageIcon name='link' />
      </span>
      <span>{mention.name}</span>
      {children}
    </span>
  )
}

export default PageMention
