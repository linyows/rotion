import React from 'react'
import type { ChildPageBlockProps, ChildPageLinkProps } from './ChildPageBlock.types'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import '../../tokens.css'
import './ChildPageBlock.css'

const ChildPageLink = ({ block, href, link, query, children }: ChildPageLinkProps) => {
  const title = block.child_page.title
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? block.page.id : encodeURIComponent(title.toLowerCase()).replace(/%20/g, '-')

  if (!href) {
    return (
      <div className="rotion-childpage-link">
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
      <Link className="rotion-childpage-link" href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  }
  return (
    <a className="rotion-childpage-link" href={`${path}${file}${queryToString(query)}`}>
      {children}
    </a>
  )
}

const ChildPageBlock = ({ block, href, link, query }: ChildPageBlockProps) => {
  if (block.page === undefined) {
    return <></>
  }

  const title = block.child_page.title
  if (block.page === null || block.page.icon === undefined || block.page.icon === null) {
    return (
      <div className="rotion-childpage">
        <ChildPageLink block={block} href={href} link={link} query={query}>
          <span className="rotion-childpage-icon">
            {'️-'}
          </span>
          <div>
            <span className="rotion-childpage-title">
              {title}
            </span>
          </div>
        </ChildPageLink>
      </div>
    )
  }

  if (block.page.icon.type === 'emoji') {
    return (
      <div className="rotion-childpage">
        <ChildPageLink block={block} href={href} link={link} query={query}>
          <span className="rotion-childpage-emoji">
            {block.page.icon.emoji}
          </span>
          <div>
            <span className="rotion-childpage-title">
              {title}
            </span>
          </div>
        </ChildPageLink>
      </div>
    )
  }

  // type external or file
  return (
    <div className="rotion-childpage">
      <ChildPageLink block={block} href={href} link={link} query={query}>
        <span className="rotion-childpage-icon">
          <img className="rotion-childpage-icon-img" src={block.page.icon.src} alt="Icon" />
        </span>
        <div>
          <span className="rotion-childpage-title">
            {title}
          </span>
        </div>
      </ChildPageLink>
    </div>
  )
}

export default ChildPageBlock
