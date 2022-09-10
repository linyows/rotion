import React, { ReactElement } from 'react'
import type {
  TitlePropertyItemObjectResponse,
} from '../../server/types'

export type ListTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
  LinkComp?: unknown
}

export const ListTitleField: React.FC<ListTitleProps> = ({ payload, path, slug, LinkComp }) => {
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
    if (LinkComp) {
      const Link = LinkComp as React.FC<{ children: ReactElement<'a'>, href: string}>
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
