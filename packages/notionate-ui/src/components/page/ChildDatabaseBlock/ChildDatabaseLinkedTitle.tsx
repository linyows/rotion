import React from 'react'
import TextBlock from '../TextBlock'
import { getLinkPathAndLinkKey } from '../../lib/linkpath'
import type { ChildDatabaseBlockProps } from './ChildDatabaseBlock.types'

const ChildDatabaseLinkedTitle = ({ block, href, link, query }: ChildDatabaseBlockProps) => {
  const title = ('title' in block.database) ? block.database.title : []
  const plainTitle = title.map(v => v.plain_text).join('').toLowerCase()
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

export default ChildDatabaseLinkedTitle
