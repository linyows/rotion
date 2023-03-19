import React from 'react'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type {
  ChildPageBlockObjectResponseEx,
  Link,
} from '../../server/types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type ChildpageBlockProps = {
  block: ChildPageBlockObjectResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

type LinkedTitleProps = ChildpageBlockProps

const ChildpageBlock: React.FC<ChildpageBlockProps> = ({ block, href, link, query }) => {
  const icon = 'icon' in block.page && block.page.icon.type === 'emoji' ? block.page.icon.emoji : ''
  const title = block.child_page.title

  const LinkedTitle = ({ block, href, link }: LinkedTitleProps) => {
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

  return (
    <div className="notionate-blocks-childpage">
      {icon}
      <div>
        {LinkedTitle({ block, href, link })}
      </div>
    </div>
  )
}

export default ChildpageBlock
