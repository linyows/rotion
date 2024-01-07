import React from 'react'
import { getLinkPathAndLinkKey } from '../../lib/linkpath'
import type { ChildPageBlockProps } from './ChildPageBlock.types'

const ChildPageLinkedTitle = ({ block, href, link, query }: ChildPageBlockProps) => {
  const title = block.child_page.title
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? block.page.id : encodeURIComponent(title.toLowerCase())

  if (!href) {
    return (
      <span className="notionate-blocks-childpage-title">
        {title}
      </span>
    )
  }
  if (link && query) {
    const Link = link
    return (
      <Link className="notionate-blocks-childpage-a" href={{ pathname: `${path}${file}`, query }}>
        {title}
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link className="notionate-blocks-childpage-a" href={`${path}${file}`}>
        {title}
      </Link>
    )
  }
  return (
    <a href={`${path}${file}`} className="notionate-blocks-childpage-a">
      {title}
    </a>
  )
}

export default ChildPageLinkedTitle
