import React, { ReactElement } from 'react'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type {
  ChildPageBlockObjectResponseEx,
} from '../../server/types'

export type ChildpageBlockProps = {
  block: ChildPageBlockObjectResponseEx
  link?: string
  LinkComp?: unknown
}

type LinkedTitleProps = ChildpageBlockProps

const ChildpageBlock: React.FC<ChildpageBlockProps> = ({ block, link, LinkComp }) => {
  const icon = block.page.icon.type === 'emoji' ? block.page.icon.emoji : ''
  const title = block.child_page.title

  const LinkedTitle = ({ block, link, LinkComp }: LinkedTitleProps) => {
    const [path, slugKey] = getLinkPathAndLinkKey(link || '')
    const file = slugKey === 'id' ? block.page.id : encodeURIComponent(title.toLowerCase())
    const Link = LinkComp as React.FC<{ children: ReactElement<'a'>, href: string}>

    if (!link) {
      return (
        <span className="notionate-blocks-childpage-title">
          {title}
        </span>
      )
    }
    if (LinkComp) {
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
        {LinkedTitle({ block, link, LinkComp })}
      </div>
    </div>
  )
}

export default ChildpageBlock
