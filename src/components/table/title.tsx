import type { ParsedUrlQueryInput } from 'node:querystring'
import React from 'react'
import type {
  TitlePropertyItemObjectResponse,
  Link,
} from '../../server/types'

export type TableTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path?: string
  slug?: string
  link?: Link
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
      const Link = link as Link
      return (
        <>
          <Link className="notionate-table-title-a" href={{ pathname: href, query }}>
            {title}
          </Link>
        </>
      )
    } else if (link) {
      const Link = link
      return (
        <>
          <Link className="notionate-table-title-a" href={href}>
            {title}
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
      {(!path && !slug) ? title : LinkedTitle()}
    </div>
  )
}

export default TableTitleField
