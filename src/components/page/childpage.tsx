import React, { ReactElement } from 'react'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type {
  ChildPageBlockObjectResponseEx,
} from '../../server/types'

export type ChildpageBlockProps = {
  block: ChildPageBlockObjectResponseEx
  href?: string
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
}

type LinkedTitleProps = ChildpageBlockProps

const ChildpageBlock: React.FC<ChildpageBlockProps> = ({ block, href, link }) => {
  const icon = block.page.icon.type === 'emoji' ? block.page.icon.emoji : ''
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
    if (link) {
      const Link = link
      return (
        <Link href={`${path}${file}`}>
          <a className="notionate-blocks-childpage-a">
            {title}
          </a>
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
