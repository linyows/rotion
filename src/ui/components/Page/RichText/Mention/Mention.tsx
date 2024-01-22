import React from 'react'
import UserMention from './UserMention/UserMention'
import type { MentionProps } from './Mention.types'
import { PageMention } from './PageMention'
import { LinkPreviewMention } from './LinkPreviewMemtion'
import { DateMention } from './DateMention'
import { TemplateMention } from './TemplateMention'

const Mention = ({ textObject, children }: MentionProps) => {
  if (textObject === undefined) {
    return <></>
  }

  switch (textObject.mention.type) {
    case 'user':
      return (
        <UserMention>
          {children}
        </UserMention>
      )
    case 'date':
      return (
        <DateMention date={textObject.mention.date}>
          {children}
        </DateMention>
      )
    case 'link_preview':
      return (
        <LinkPreviewMention url={textObject.mention.link_preview.url} text={textObject.plain_text}>
          {children}
        </LinkPreviewMention>
      )
    case 'page':
      return (
        <PageMention mention={textObject.mention.page}>
          {children}
        </PageMention>
      )
    case 'database':
      return (
        <PageMention mention={textObject.mention.database}>
          {children}
        </PageMention>
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
