import React, { ReactElement } from 'react'
import type {
  TitlePropertyItemObjectResponse,
} from '../../server/types'

export type ListTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
}

export const ListTitleField: React.FC<ListTitleProps> = ({ payload, path, slug, link }) => {
  const title = payload.map(v => {
    const richtext = v.title
    switch (richtext.type) {
      case 'text':
        return richtext.text.content
      case 'mention':
        return richtext.mention.type
      default:
        return richtext.equation.expression
    }
  }).join(',')
  const href = `${path}${slug}`

  const LinkedTitle = () => {
    if (link) {
      const Link = link
      return (
        <>
          <Link href={href}>
            <a className="notionate-list-title-a" title={title}>
              {title}
            </a>
          </Link>
        </>
      )
    }

    return (
      <a className="notionate-list-title-a" href={href} title={title}>
        {title}
      </a>
    )
  }

  return (
    <div className="notionate-list-title">
      {LinkedTitle()}
    </div>
  )
}

export default ListTitleField
