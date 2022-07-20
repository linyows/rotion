import React from 'react'
import path from 'path'
import type { RichTextItemResponse, BlockObjectResponse } from '../../types'

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
    <a href={textObject.href as string} rel={"noreferrer"} target={"_blank"}>
      {children}
      <style jsx>{`
        a {
          text-decoration: none;
        }
      `}</style>
    </a>
  )
}

export const MentionObject: React.FC<TextProps> = ({ textObject, children }) => {
  return (
    <span className="mention">
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M899 1910 c-314 -38 -586 -232 -720 -515 -63 -133 -80 -205 -86 -356 -6 -144 10 -245 57 -367 88 -226 287 -429 503 -512 110 -43 117 -38 117 88 l0 97 -98 0 c-89 0 -102 2 -138 26 -27 18 -49 46 -72 90 -37 74 -54 96 -99 127 -39 28 -42 49 -9 58 43 10 110 -28 155 -90 46 -61 71 -82 122 -96 45 -13 138 5 145 28 3 10 15 38 28 63 l22 46 -76 17 c-220 47 -330 188 -330 425 0 81 19 150 59 213 29 45 30 51 21 100 -10 52 -7 95 12 157 10 33 11 33 56 28 25 -3 82 -24 128 -47 l82 -42 59 13 c79 16 232 17 324 0 76 -13 76 -13 116 13 50 34 148 68 182 64 20 -2 28 -11 37 -43 15 -49 17 -135 4 -169 -8 -21 -4 -34 25 -76 45 -67 57 -116 57 -225 -2 -235 -118 -376 -344 -416 -64 -12 -67 -13 -52 -30 34 -38 43 -91 44 -256 0 -133 3 -164 16 -177 21 -22 25 -21 115 18 147 64 292 181 385 311 50 70 109 196 136 290 19 68 23 104 23 235 0 188 -13 248 -90 405 -92 185 -230 325 -411 415 -144 72 -349 108 -505 90z"/>
        </g>
      </svg>
      {children}
      <style jsx>{`
        svg {
          margin-right: var(--spacing-1);
          vertical-align: middle;
        }
        .mention {
          border-radius: 3px;
          font-size: var(--fontSize-1);
          padding: var(--spacing-0) var(--spacing-1) var(--spacing-1);
          color: #000;
        }
        .mention:hover {
          background: rgba(135,131,120,0.15);
        }
      `}</style>
    </span>
  )
}

export const StyleObject: React.FC<TextProps> = ({ textObject, children }) => {
  const { annotations, href } = textObject
  let css = ['annotation']
  if (annotations.bold) css.push('bold')
  if (annotations.italic) css.push('italic')
  if (annotations.strikethrough) css.push('strikethrough')
  if (annotations.underline) css.push('underline')
  if (annotations.code) css.push('code')

  return (
    <span className={css.join(' ')}>
      {children}
      <style jsx>{`
        .annotation {
          ${annotations.color !== 'default' ? `` : `color: ${annotations.color};`}
          ${href === null ? ``: `border-bottom: 1px solid #999;
          color: #666;`}
        }
        .bold {
          font-weight: var(--fontWeight-bold);
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
        .code {
          color: ${annotations.color === 'default' ? '#EB5757' : annotations.color};
          font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;
          background: rgba(135,131,120,0.15);
          border-radius: 3px;
          font-size: var(--fontSize-0);
          padding: var(--spacing-1) var(--spacing-2);
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
    return (
      <>
        {children}
      </>
    )
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
    <CustomTag>
      {block.map((textObject, i) => (
        <TextObject textObject={textObject} key={i} />
      ))}
    </CustomTag>
  )
}

export default TextBlock
