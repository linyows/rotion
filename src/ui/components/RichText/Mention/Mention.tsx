import React from 'react'
import UserMention from './UserMention/UserMention'
import type { MentionProps } from './Mention.types'
import { PageOrDatabaseMention } from './PageOrDatabaseMention'
import { LinkPreviewMention } from './LinkPreviewMention'
import { DateMention } from './DateMention'
import { TemplateMention } from './TemplateMention'
import '../../tokens.css'

const Mention = ({ textObject, children }: MentionProps) => {
  if (!textObject) {
    return <></>
  }

  switch (textObject.mention.type) {
    case 'user':
      return (
        <UserMention payload={textObject} />
      )
    case 'date':
      return (
        <DateMention date={textObject.mention.date} />
      )
    case 'link_preview':
      return (
        <LinkPreviewMention url={textObject.mention.link_preview.url} text={textObject.plain_text} />
      )
    case 'page':
      return (
        <PageOrDatabaseMention mention={textObject.mention.page} />
      )
    case 'database':
      return (
        <PageOrDatabaseMention mention={textObject.mention.database} />
      )
    case 'template_mention':
      return (
        <TemplateMention text={textObject.plain_text}>
          {children}
        </TemplateMention>
      )
    default:
      console.log(`unsupport mention: ${textObject.mention}`)
      return <></>
  }
}

export default Mention
