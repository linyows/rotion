import React from 'react'
import path from 'path'
import type { RichTextItemResponse, BlockObjectResponse } from '../../types'
import { GithubIcon, SlackIcon, FigmaIcon } from './icons'

// export type TextObject = {
//   type: string
//   text?: {
//     content: string
//     link: {
//       url: string
//     } | null
//   }
//   mention?: {
//     type: string
//     link_preview: {
//       url: string
//     }
//   }
//   annotations: {
//     bold: boolean
//     italic: boolean
//     strikethrough: boolean
//     underline: boolean
//     code: boolean
//     color: string
//   }
//   plain_text: string
//   href: string | null
// }

type TextProps = {
  textObject: RichTextItemResponse
}

export const LinkObject: React.FC<TextProps> = ({ textObject, children }) => {
  return (
    <a href={textObject.href as string} rel="noreferrer" target="_blank">
      {children}
      <style jsx>{`
        a {
          text-decoration: none;
        }
      `}</style>
    </a>
  )
}

const UserMention = ({ children }) => {
  return (
    <>
      <span className="mention-user">
        {children}
      </span>
      <style jsx>{`
        .mention-user {
          color: #999;
        }
      `}</style>
    </>
  )
}

export const MentionObject: React.FC<TextProps> = ({ textObject, children }) => {
  if (textObject.mention.type === 'link_preview') {
    const url = textObject.mention.link_preview.url
    let Icon

    if (url.includes('github.com')) {
      Icon = GithubIcon
    } else if (url.includes('slack.com')) {
      Icon = SlackIcon
    } else if (url.includes('figma.com')) {
      Icon = FigmaIcon
    } else {
      console.log(`unsupport mention link_preview: ${url}`)
    }

    return (
      <>
        <span className="mention">
          {Icon && <Icon />}
          {children}
        </span>
        <style jsx>{`
          .mention {
            padding: .1rem .2rem .2rem;
            border-radius: 5px;
          }
          .mention:hover {
            background: rgba(135,131,120,0.15);
          }
        `}</style>
      </>
    )

  } else if (textObject.mention.type === 'user') {
    return UserMention({ children })

  } else {
    console.log(`unsupport mention type: ${textObject.mention.type}`)
    return
  }
}

export const StyleObject: React.FC<TextProps> = ({ textObject, children }) => {
  const { annotations, href } = textObject
  let css = ['annotation']
  css.push(`color-${annotations.color.replace('_', '-')}`)
  if (annotations.bold) css.push('bold')
  if (annotations.italic) css.push('italic')
  if (annotations.strikethrough) css.push('strikethrough')
  if (annotations.underline) css.push('underline')
  if (annotations.code) css.push('code')
  if (href !== null) css.push('link')

  return (
    <span className={css.join(' ')}>
      {children}
      <style jsx>{`
        .color-default {
          color: inherit;
        }
        .color-gray {
          color: rgba(120, 119, 116, 1);
        }
        .color-brown {
          color: rgba(159, 107, 83, 1);
        }
        .color-orange {
          color: rgba(217, 115, 13, 1);
        }
        .color-yellow {
          color: rgba(203, 145, 47, 1);
        }
        .color-green {
          color: rgba(68, 131, 97, 1);
        }
        .color-blue {
          color: rgba(51, 126, 169, 1);
        }
        .color-purple {
          color: rgba(144, 101, 176, 1);
        }
        .color-pink {
          color: rgba(193, 76, 138, 1);
        }
        .color-red {
          color: rgba(212, 76, 71, 1);
        }
        .color-default-background {
          background: inherit;
        }
        .color-gray-background {
          background: rgba(241, 241, 239, 1);
        }
        .color-brown-background {
          background: rgba(244, 238, 238, 1);
        }
        .color-orange-background {
          background: rgba(251, 236, 221, 1);
        }
        .color-yellow-background {
          background: rgba(251, 243, 219, 1);
        }
        .color-green-background {
          background: rgba(237, 243, 236, 1);
        }
        .color-blue-background {
          background: rgba(231, 243, 248, 1);
        }
        .color-purple-background {
          background: rgba(244, 240, 247, 0.8);
        }
        .color-pink-background {
          background: rgba(249, 238, 243, 0.8);
        }
        .color-red-background {
          background: rgba(253, 235, 236, 1);
        }
        .bold {
          font-weight: bold;
        }
        .italic {
          font-style: italic;
        }
        .strikethrough {
          text-decoration: line-through;
        }
        .underline {
          text-decoration: underline;
        }
        .link {
          border-bottom: 1px solid #999;
          color: #666;
        }
        .code {
          color: #EB5757;
          font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;
          background: rgba(135,131,120,0.15);
          border-radius: 3px;
          font-size: .8rem;
          padding: .1rem .2rem;
        }
      `}</style>
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
      <CustomTag />
    )
  }

  return (
    <>
      <CustomTag className={`text-${tag}`}>
        {block.map((textObject, i) => (
          <TextObject textObject={textObject} key={i} />
        ))}
      </CustomTag>
      <style jsx>{`
        .text-h1,
        .text-h2,
        .text-h3,
        .text-h4 {
        }
        .text-p {
        }
        .text-blockquote {
          border-left: 3px solid currentcolor;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
        }
      `}</style>
    </>
  )
}

export default TextBlock
