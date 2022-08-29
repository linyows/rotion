import React from 'react'
import Link from 'next/link'
import { TextBlock } from './text'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type {
  ChildDatabaseBlockObjectResponseEx,
} from '../../types'

export type ChilddatabaseBlockProps = {
  block: ChildDatabaseBlockObjectResponseEx
  link?: string
}

const ChilddatabaseBlock: React.FC<ChilddatabaseBlockProps> = ({ block, link }) => {
  const icon = ('icon' in block.database) && block.database.icon?.type === 'emoji' ? block.database.icon.emoji : ''
  const title = ('title' in block.database) ? block.database.title : []
  const plainTitle = title.map(v => v.plain_text).join('').toLowerCase()
  const [path, slugKey] = getLinkPathAndLinkKey(link || '')
  const file = slugKey === 'id' ? block.database.id : encodeURIComponent(plainTitle.toLowerCase())
  return (
    <div className="notionate-blocks-childdatabase">
      <span>
        {icon}
      </span>
      <div>
        <Link href={`${path}${file}`}>
          <a className="childdatabase-anchor">
            {TextBlock({ tag: 'span', block: title })}
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ChilddatabaseBlock
