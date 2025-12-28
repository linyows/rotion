import React from 'react'
import type { ChildDatabaseBlockProps, ChildDatabaseLinkProps } from './ChildDatabaseBlock.types'
import { getLinkPathAndLinkKey, queryToString } from '../../lib.js'
import '../../tokens.css'
import './ChildDatabaseBlock.css'

const ChildDatabaseLink = ({ block, href, link, query, children }: ChildDatabaseLinkProps) => {
  const title = block.child_database.title
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? block.database.id : encodeURIComponent(title.toLowerCase()).replace(/%20/g, '-')

  if (!href) {
    return (
      <div className="rotion-childdb-link">
        {children}
      </div>
    )
  }
  if (link) {
    const Link = link
    if (query === undefined) {
      query = {}
    }
    return (
      <Link className="rotion-childdb-link" href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  }

  return (
    <a className="rotion-childdb-link" href={`${path}${file}${queryToString(query)}`}>
      {children}
    </a>
  )
}

const ChildDatabaseBlock = ({ block, href, link, query }: ChildDatabaseBlockProps) => {
  if (block.database === undefined) {
    return <></>
  }

  const title = block.child_database.title
  if (block.database === null || block.database.icon === undefined || block.database.icon === null) {
    return (
      <div className="rotion-childdb">
        <ChildDatabaseLink block={block} href={href} link={link} query={query}>
          <span className="rotion-childdb-icon">
            {'️-'}
          </span>
          <div>
            <span className="rotion-childdb-title">
              {title}
            </span>
          </div>
        </ChildDatabaseLink>
      </div>
    )
  }

  if (block.database.icon.type === 'emoji') {
    return (
      <div className="rotion-childdb">
        <ChildDatabaseLink block={block} href={href} link={link} query={query}>
          <span className="rotion-childdb-emoji">
            {block.database.icon.emoji}
          </span>
          <div>
            <span className="rotion-childdb-title">
              {title}
            </span>
          </div>
        </ChildDatabaseLink>
      </div>
    )
  }

  // type external or file
  return (
    <div className="rotion-childdb">
      <ChildDatabaseLink block={block} href={href} link={link} query={query}>
        <span className="rotion-childdb-icon">
          <img className="rotion-childdb-icon-img" src={block.database.icon.src} alt="Icon" />
        </span>
        <div>
          <span className="rotion-childdb-title">
            {title}
          </span>
        </div>
      </ChildDatabaseLink>
    </div>
  )
}

export default ChildDatabaseBlock
