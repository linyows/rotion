import React, { ReactElement } from 'react'
import { TextBlock } from './text'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type {
  ChildDatabaseBlockObjectResponseEx,
} from '../../server/types'

export type ChilddatabaseBlockProps = {
  block: ChildDatabaseBlockObjectResponseEx
  link?: string
  LinkComp?: unknown
}

type LinkedTitleProps = ChilddatabaseBlockProps

const ChilddatabaseBlock: React.FC<ChilddatabaseBlockProps> = ({ block, link, LinkComp }) => {
  const icon = ('icon' in block.database) && block.database.icon?.type === 'emoji' ? block.database.icon.emoji : ''
  const title = ('title' in block.database) ? block.database.title : []
  const plainTitle = title.map(v => v.plain_text).join('').toLowerCase()

  const LinkedTitle = ({ block, link, LinkComp }: LinkedTitleProps) => {
    const [path, slugKey] = getLinkPathAndLinkKey(link || '')
    const file = slugKey === 'id' ? block.database.id : encodeURIComponent(plainTitle.toLowerCase())
    const Link = LinkComp as React.FC<{ children: ReactElement<'a'>, href: string}>

    if (!link) {
      return (
        <TextBlock tag="span" block={title} />
      )
    }
    if (LinkComp) {
      return (
        <Link href={`${path}${file}`}>
          <a className="notionate-blocks-childdatabase-a">
            <TextBlock tag="span" block={title} />
          </a>
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
        {LinkedTitle({ block, link, LinkComp })}
      </div>
    </div>
  )
}

export default ChilddatabaseBlock
