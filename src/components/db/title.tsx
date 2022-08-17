import React from 'react'
import Link from 'next/link'
import type {
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
} from '../../types'

export type DBTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
}

export const DBTitleField: React.FC<DBTitleProps> = ({ payload, path, slug }) => {
  const title = payload.map(v => {
    const richtext = v.title
    switch (richtext.type) {
      case 'text':
        return richtext.text.content
        break
      case 'mention':
        return richtext.mention.type
        break
      default:
        return richtext.equation.expression
        break
    }
  }).join(',')
  const href = `${path}${slug}`

  return (
    <div className="title">
      <Link href={href}>
        <a className="title-anchor" title={title}>
          {title}
        </a>
      </Link>
      <style jsx>{`
        .title {
          white-space: nowrap;
          display: block;
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: auto;
          line-height: 1.3;
        }
        .title-anchor {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default DBTitleField
