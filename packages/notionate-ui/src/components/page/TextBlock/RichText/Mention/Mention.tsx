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
    case 'date':
      console.log(`unsupport mention type: ${textObject.mention.type}`)
      const { start, end, time_zone } = textObject.mention.date
      return (
        <span className="notionate-blocks-text-mention-date">
          {start} - {end} {time_zone}
        </span>
      )
    case 'link_preview':
      const { url } = textObject.mention.link_preview
      return (
        <span className="notionate-blocks-text-mention">
          {url.includes('github.com') && <PageIcon name='github' />}
          {url.includes('slack.com') && <PageIcon name='slack' />}
          {url.includes('figma.com') && <PageIcon name='figma' />}
          {pathBasename(plain_text)}
        </span>
      )
    case 'page':
      console.log(`unsupport mention type: ${textObject.mention.type}`)
      return (
        <span className="notionate-blocks-text-mention-page">
          {textObject.mention.page.name}
        </span>
      )
    case 'database':
      console.log(`unsupport mention type: ${textObject.mention.type}`)
      return (
        <span className="notionate-blocks-text-mention-database">
          {textObject.mention.database.name}
        </span>
      )

    case 'template_mention':
    default:
      console.log(`unsupport mention type: ${textObject.mention.type}`)
      return <></>
  }
}

export default Mention
