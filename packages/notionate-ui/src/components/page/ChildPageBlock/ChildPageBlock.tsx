import React from 'react'
import type { ChildPageBlockProps, ChildPageLinkProps } from './ChildPageBlock.types'
import { getLinkPathAndLinkKey } from '../../lib/linkpath'

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
  if (link && query) {
    const Link = link
    return (
      <Link className="notionate-blocks-childpage-a" href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link className="notionate-blocks-childpage-a" href={`${path}${file}`}>
        {children}
      </Link>
    )
  }
  return (
    <a href={`${path}${file}`} className="notionate-blocks-childpage-a">
      {children}
    </a>
  )
}

const ChildPageBlock = ({ block, href, link, query }: ChildPageBlockProps) => {
  const title = block.child_page.title
  if (!('icon' in block.page) || block.page.icon === null) {
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
