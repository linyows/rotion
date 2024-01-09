import React from 'react'
import type { ChildPageBlockProps, ChildPageLinkProps } from './ChildPageBlock.types'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'

const ChildPageLink = ({ block, href, link, query, children }: ChildPageLinkProps) => {
  const title = block.child_page.title
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? block.page.id : encodeURIComponent(title.toLowerCase())

  if (!href) {
    return (
      <div className="notionate-blocks-childpage-a">
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
      <Link className="notionate-blocks-childpage-a" href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  }
  return (
    <a href={`${path}${file}${queryToString(query)}`} className="notionate-blocks-childpage-a">
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
      <div className="notionate-blocks-childpage">
        <ChildPageLink block={block} href={href} link={link} query={query}>
          <span className="notionate-blocks-childpage-icon">
            {'️-'}
          </span>
          <div>
            <span className="notionate-blocks-childpage-title">
              {title}
            </span>
          </div>
        </ChildPageLink>
      </div>
    )
  }

  if (block.page.icon.type === 'emoji') {
    return (
      <div className="notionate-blocks-childpage">
        <ChildPageLink block={block} href={href} link={link} query={query}>
          <span className="notionate-blocks-childpage-icon">
            {block.page.icon.emoji}
          </span>
          <div>
            <span className="notionate-blocks-childpage-title">
              {title}
            </span>
          </div>
        </ChildPageLink>
      </div>
    )
  }

  // type external or file
  return (
    <div className="notionate-blocks-childpage">
      <ChildPageLink block={block} href={href} link={link} query={query}>
        <span className="notionate-blocks-childpage-icon">
          <img className="notionate-blocks-childpage-file-icon" src={block.page.icon.src} alt="Icon" />
        </span>
        <div>
          <span className="notionate-blocks-childpage-title">
            {title}
          </span>
        </div>
      </ChildPageLink>
    </div>
  )
}

export default ChildPageBlock
