import React from 'react'
import Link from 'next/link'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type {
  ChildPageBlockObjectResponseEx,
} from '../../types'

export type ChildpageBlockProps = {
  block: ChildPageBlockObjectResponseEx
  link?: string
}

const ChildpageBlock: React.FC<ChildpageBlockProps> = ({ block, link }) => {
  const icon = block.page.icon.type === 'emoji' ? block.page.icon.emoji : ''
  const title = block.child_page.title
  const [path, slugKey] = getLinkPathAndLinkKey(link || '')
  const file = slugKey === 'id' ? block.page.id : encodeURIComponent(title.toLowerCase())
  return (
    <div className="childpage">
      <span className="childpage-icon">
        {icon}
      </span>
      <div>
        {link &&
          <Link href={`${path}${file}`}>
            <a className="childpage-anchor">
              {title}
            </a>
          </Link>
        }
        {!link &&
          <span className="childpage-title">
            {title}
          </span>
        }
      </div>
      <style jsx>{`
        .childpage {
          display: grid;
          width: 100%;
          grid-template: repeat(1, 1fr) / 1rem 1fr;
          gap: .8rem;
        }
        .childpage-anchor {
          color: #333;
          border-bottom: 1px solid #ddd;
          display: inline;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default ChildpageBlock
