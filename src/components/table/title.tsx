import type { ParsedUrlQueryInput } from 'node:querystring'
import type { UrlObject } from 'node:url'
import React, { ReactElement } from 'react'
import type {
  TitlePropertyItemObjectResponse,
} from '../../server/types'

export type TableTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
  query?: ParsedUrlQueryInput
}

export const TableTitleField: React.FC<TableTitleProps> = ({ payload, path, slug, link, query }) => {
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
      const Link = link as unknown as React.FC<{ children: ReactElement<'a'>, href: UrlObject}>
      return (
        <>
          <Link href={{ pathname: href, query }}>
            <a className="notionate-table-title-a" title={title}>
              {title}
            </a>
          </Link>
        </>
      )
    } else if (link) {
      const Link = link
      return (
        <>
          <Link href={href}>
            <a className="notionate-table-title-a" title={title}>
              {title}
            </a>
          </Link>
        </>
      )
    }

    return (
      <a className="notionate-table-title-a" href={href} title={title}>
        {title}
      </a>
    )
  }

  return (
    <div className="notionate-table-title">
      {LinkedTitle()}
    </div>
  )
}

export default TableTitleField
