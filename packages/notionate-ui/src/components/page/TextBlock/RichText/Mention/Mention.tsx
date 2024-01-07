import React from 'react'
import UserMention from './UserMention'
import PageIcon from '../../../PageIcon'
import type { RichTextProps } from '../RichText.types'

const pathBasename = (str: string): string => {
  const u = str.replace(/\/$/, '')
  const l = u.substring(u.lastIndexOf('/') + 1)
  return l.lastIndexOf('?') > 0 ? l.substring(0, l.lastIndexOf('?')) : l
}

const Mention = ({ textObject, children }: RichTextProps) => {
  const { plain_text } = textObject
  if (textObject.type === 'mention') {
    if (textObject.mention.type === 'link_preview') {
      const url = textObject.mention.link_preview.url
      return (
        <span className="notionate-blocks-text-mention">
          {url.includes('github.com') && <PageIcon name='github' />}
          {url.includes('slack.com') && <PageIcon name='slack' />}
          {url.includes('figma.com') && <PageIcon name='figma' />}
          {pathBasename(plain_text)}
        </span>
      )
    } else if (textObject.mention.type === 'user') {
      return UserMention({ children })
    } else {
      console.log(`unsupport mention type: ${textObject.mention.type}`)
      return <></>
    }
  } else {
    console.log(`unsupport richtext type: ${textObject.type}`)
    return <></>
  }
}

export default Mention
