import React from 'react'
import path from 'path'
import type { RichTextItemResponse } from '../../server/types'
import { GithubIcon, SlackIcon, FigmaIcon } from './icons'

type TextProps = React.PropsWithChildren & {
  textObject: RichTextItemResponse
  key?: string
}

const pathBasename = (str: string): string => {
  const u = str.replace(/\/$/, '')
  const l = u.substring(u.lastIndexOf('/') + 1)
  return l.lastIndexOf('?') > 0 ? l.substring(0, l.lastIndexOf('?')) : l
}

export const LinkObject: React.FC<TextProps> = ({ textObject, children }) => {
  return (
    <a className="notionate-blocks-text-a" href={textObject.href as string} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

const UserMention: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="notionate-blocks-text-usermention">
      {children}
    </span>
  )
}

export const MentionObject: React.FC<TextProps> = ({ textObject, children }) => {
  if (textObject.type === 'mention') {
    if (textObject.mention.type === 'link_preview') {
      const url = textObject.mention.link_preview.url
      return (
        <span className="notionate-blocks-text-mention">
          {url.includes('github.com') && <GithubIcon />}
          {url.includes('slack.com') && <SlackIcon />}
          {url.includes('figma.com') && <FigmaIcon />}
          {children}
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

export const StyleObject: React.FC<TextProps> = ({ textObject, children }) => {
  const { annotations, href } = textObject
  let css = ['notionate-blocks-text-annotation']
  css.push(`notionate-blocks-text-${annotations.color.replace('_', '-')}`)
  if (annotations.bold) css.push('notionate-blocks-text-bold')
  if (annotations.italic) css.push('notionate-blocks-text-italic')
  if (annotations.strikethrough) css.push('notionate-blocks-text-strikethrough')
  if (annotations.underline) css.push('notionate-blocks-text-underline')
  if (annotations.code) css.push('notionate-blocks-text-code')
  if (href !== null) css.push('notionate-blocks-text-anchor')

  return (
    <span className={css.join(' ')}>
      {children}
    </span>
  )
}

export const TextObject: React.FC<TextProps> = ({ textObject }) => {
  const { href, plain_text } = textObject
  const children = textObject.type === 'mention' ?
    MentionObject({ textObject, children: StyleObject({ textObject, children: path.basename(plain_text) }) }) :
    StyleObject({ textObject, children: plain_text })

  if (href === null) {
    return children
  }

  return (
    <LinkObject textObject={textObject}>
      {children}
    </LinkObject>
  )
}

export type TextBlockProps = {
  tag: keyof JSX.IntrinsicElements
  block: RichTextItemResponse[] | undefined
}

export const TextBlock: React.FC<TextBlockProps> = ({ tag, block }) => {
  const CustomTag = tag
  if (block === undefined) {
    return (
      <div className="notionate-blocks-text-hr">
      </div>
    )
  }

  return (
    <>
      <CustomTag className={`notionate-blocks-text-${tag}`}>
        {block.map((v, i) => (
          <TextObject textObject={v} key={`${i}`} />
        ))}
      </CustomTag>
    </>
  )
}

export default TextBlock
