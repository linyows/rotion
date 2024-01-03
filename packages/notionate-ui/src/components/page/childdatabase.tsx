import React from 'react'
import { TextBlock } from './text'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type {
  ChildDatabaseBlockObjectResponseEx,
  Link,
} from 'notionate-pages'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type ChilddatabaseBlockProps = {
  block: ChildDatabaseBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

type LinkedTitleProps = ChilddatabaseBlockProps

const ChilddatabaseBlock: React.FC<ChilddatabaseBlockProps> = ({ block, href, link, query }) => {
  if (!('database' in block)) {
    return <></>
  }

  const icon = ('icon' in block.database) && block.database.icon?.type === 'emoji' ? block.database.icon.emoji : ''
  const title = ('title' in block.database) ? block.database.title : []
  const plainTitle = title.map(v => v.plain_text).join('').toLowerCase()

  const LinkedTitle = ({ block, href, link }: LinkedTitleProps) => {
    const [path, slugKey] = getLinkPathAndLinkKey(href || '')
    const file = slugKey === 'id' ? block.database.id : encodeURIComponent(plainTitle.toLowerCase())

    if (!href) {
      return (
        <TextBlock tag="span" block={title} />
      )
    }
    if (link && query) {
      const Link = link
      return (
        <Link className="notionate-blocks-childdatabase-a" href={{ pathname: `${path}${file}`, query }}>
          <TextBlock tag="span" block={title} />
        </Link>
      )
    } else if (link) {
      const Link = link
      return (
        <Link className="notionate-blocks-childdatabase-a" href={`${path}${file}`}>
          <TextBlock tag="span" block={title} />
        </Link>
      )
    }
    return (
      <a href={`${path}${file}`} className="notionate-blocks-childdatabase-a">
        <TextBlock tag="span" block={title} />
      </a>
    )
  }

  return (
    <div className="notionate-blocks-childdatabase">
      <span>
        {icon}
      </span>
      <div>
        {LinkedTitle({ block, href, link })}
      </div>
    </div>
  )
}

export default ChilddatabaseBlock
