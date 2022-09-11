import React, { ReactElement } from 'react'
import type {
  TitlePropertyItemObjectResponse,
} from '../../server/types'

export type TableTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
  LinkComp?: unknown
}

export const TableTitleField: React.FC<TableTitleProps> = ({ payload, path, slug, LinkComp }) => {
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
