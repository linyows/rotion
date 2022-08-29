import React, { ReactElement } from 'react'
import type {
  TitlePropertyItemObjectResponse,
} from '../../server/types'

export type DBTitleProps = {
  payload: Array<TitlePropertyItemObjectResponse>
  path: string
  slug: string
  LinkComp?: unknown
}

export const DBTitleField: React.FC<DBTitleProps> = ({ payload, path, slug, LinkComp }) => {
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
    if (LinkComp) {
      const Link = LinkComp as React.FC<{ children: ReactElement<'a'>, href: string}>
      return (
        <>
          <Link href={href}>
            <a className="notionate-db-title-a" title={title}>
              {title}
            </a>
          </Link>
        </>
      )
    }

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
