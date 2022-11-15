import React, { ReactElement } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import { UrlObject } from 'node:url'
import type {
  TitlePropertyItemObjectResponse,
} from '../../server/types'

export type ListTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
  link?: React.FC<{ children: ReactElement<'a'> | string, className: string, href: string | UrlObject}>
  query?: ParsedUrlQueryInput
}

export const ListTitleField: React.FC<ListTitleProps> = ({ payload, path, slug, link, query }) => {
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
    if (link && query) {
      const Link = link
      return (
        <>
          <Link className="notionate-list-title-a" href={{ pathname: href, query }}>
            {title}
          </Link>
        </>
      )
    } else if (link) {
      const Link = link
      return (
        <>
          <Link className="notionate-list-title-a" href={href}>
            {title}
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
