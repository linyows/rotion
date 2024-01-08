import React from 'react'
import type { ChildDatabaseBlockProps, ChildDatabaseLinkProps } from './ChildDatabaseBlock.types'
import { getLinkPathAndLinkKey } from '../../lib/linkpath'

const ChildDatabaseLink = ({ block, href, link, query, children }: ChildDatabaseLinkProps) => {
  const title = block.child_database.title
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? block.database.id : encodeURIComponent(title.toLowerCase())

  if (!href) {
    return (
      <div className="notionate-blocks-childdatabase-a">
        {children}
      </div>
    )
  }
  if (link && query) {
    const Link = link
    return (
      <Link className="notionate-blocks-childdatabase-a" href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link className="notionate-blocks-childdatabase-a" href={`${path}${file}`}>
        {children}
      </Link>
    )
  }
  return (
    <a href={`${path}${file}`} className="notionate-blocks-childdatabase-a">
      {children}
    </a>
  )
}

const ChildDatabaseBlock = ({ block, href, link, query }: ChildDatabaseBlockProps) => {
  const title = block.child_database.title
  if (!('icon' in block.database) || block.database.icon === null) {
    return (
      <div className="notionate-blocks-childdatabase">
        <ChildDatabaseLink block={block} href={href} link={link} query={query}>
          <span className="notionate-blocks-childdatabase-icon">
            {'️-'}
          </span>
          <div>
            <span className="notionate-blocks-childdatabase-title">
              {title}
            </span>
          </div>
        </ChildDatabaseLink>
      </div>
    )
  }

  if (block.database.icon.type === 'emoji') {
    return (
      <div className="notionate-blocks-childdatabase">
        <ChildDatabaseLink block={block} href={href} link={link} query={query}>
          <span className="notionate-blocks-childdatabase-icon">
            {block.database.icon.emoji}
          </span>
          <div>
            <span className="notionate-blocks-childdatabase-title">
              {title}
            </span>
          </div>
        </ChildDatabaseLink>
      </div>
    )
  }

  // type external or file
  return (
    <div className="notionate-blocks-childdatabase">
      <ChildDatabaseLink block={block} href={href} link={link} query={query}>
        <span className="notionate-blocks-childdatabase-icon">
          <img className="notionate-blocks-childdatabase-file-icon" src={block.database.icon.src} alt="Icon" />
        </span>
        <div>
          <span className="notionate-blocks-childdatabase-title">
            {title}
          </span>
        </div>
      </ChildDatabaseLink>
    </div>
  )
}

export default ChildDatabaseBlock
