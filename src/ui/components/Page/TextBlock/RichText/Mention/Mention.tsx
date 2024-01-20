import React from 'react'
import UserMention from './UserMention/UserMention'
import PageIcon from '../../../PageIcon/PageIcon'
import type { MentionProps } from './Mention.types'
import { pathBasename } from '../../../../lib'

const Mention = ({ textObject, children }: MentionProps) => {
  if (textObject === undefined) {
    return <></>
  }

  const { plain_text } = textObject
  const { type } = textObject.mention

  switch (type) {
    case 'user':
      return UserMention({ children })
    case 'date': {
      console.log(`unsupport mention type: ${textObject.mention.type}`)
      const { start, end, time_zone } = textObject.mention.date
      return (
        <span className="notionate-blocks-text-mention-date">
          @{start}{end === null ? '' : ` -> ${end}`}{time_zone === null ? '' : `(${time_zone})`}
        </span>
      )
    }
    case 'link_preview': {
      const { url } = textObject.mention.link_preview
      return (
        <span className="notionate-blocks-text-mention">
          {url.includes('github.com') && <PageIcon name='github' />}
          {url.includes('slack.com') && <PageIcon name='slack' />}
          {url.includes('figma.com') && <PageIcon name='figma' />}
          {pathBasename(plain_text)}
        </span>
      )
    }
    case 'page': {
      const { page } = textObject.mention
      return (
        <span className="notionate-blocks-text-mention-page">
          <span>{page.icon.type === 'emoji' ? page.icon.emoji : <img src={page.icon.src} alt="icon"/>}</span>
          <span>{page.name}</span>
        </span>
      )
    }
    case 'database': {
      const { database } = textObject.mention
      return (
        <span className="notionate-blocks-text-mention-database">
          <span>{database.icon.type === 'emoji' ? database.icon.emoji : <img src={database.icon.src} alt="icon"/>}</span>
          <span>{database.name}</span>
        </span>
      )
    }
    case 'template_mention':
    default:
      console.log(`unsupport mention type: ${textObject.mention.type}`)
      return <></>
  }
}

export default Mention
