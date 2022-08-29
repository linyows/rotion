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

  const LinkedTitle = () => {
    return (
      <a className="notionate-db-title-a" href={href} title={title}>
        {title}
      </a>
    )
  }

  return (
    <div className="notionate-db-title">
      {LinkedTitle()}
    </div>
  )
}

export default DBTitleField
