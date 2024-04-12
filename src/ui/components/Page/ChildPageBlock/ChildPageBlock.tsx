import React from 'react'
import type { ChildPageBlockProps, ChildPageLinkProps } from './ChildPageBlock.types'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    width: '100%',
  },
  link: {
    display: 'grid',
    gridTemplate: 'repeat(1, 1fr) / 1.5rem 1fr',
    gap: '.4rem',
    margin: '.2rem 0 0',
    padding: '.3rem',
    textDecoration: link.textDecoration,
    color: link.color,
    alignItems: 'top',
    backgroundColor: {
      default: link.bgColor,
      ':hover': link.bgColorHover,
    },
    borderRadius: tokens.borderRadius,
  },
  title: {
    borderBottom: link.borderBottom,
    verticalAlign: 'top',
  },
  icon: {
    overflow: 'hidden',
  },
})

const ChildPageLink = ({ block, href, link, query, children }: ChildPageLinkProps) => {
  const title = block.child_page.title
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? block.page.id : encodeURIComponent(title.toLowerCase()).replace(/%20/g, '-')

  if (!href) {
    return (
      <div className={`rotion-childpage-link ${Stylex(style.link)}`}>
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
      <Link className={`rotion-childpage-link ${Stylex(style.link)}`} href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  }
  return (
    <a className={`rotion-childpage-link ${Stylex(style.link)}`} href={`${path}${file}${queryToString(query)}`}>
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
      <div className={`rotion-childpage ${Stylex(style.wrapper)}`}>
        <ChildPageLink block={block} href={href} link={link} query={query}>
          <span className={`rotion-childpage-icon ${Stylex(style.icon)}`}>
            {'️-'}
          </span>
          <div>
            <span className={`rotion-childpage-title ${Stylex(style.title)}`}>
              {title}
            </span>
          </div>
        </ChildPageLink>
      </div>
    )
  }

  if (block.page.icon.type === 'emoji') {
    return (
      <div className={`rotion-childpage ${Stylex(style.wrapper)}`}>
        <ChildPageLink block={block} href={href} link={link} query={query}>
          <span className={`rotion-childpage-icon ${Stylex(style.icon)}`}>
            {block.page.icon.emoji}
          </span>
          <div>
            <span className={`rotion-childpage-title ${Stylex(style.title)}`}>
              {title}
            </span>
          </div>
        </ChildPageLink>
      </div>
    )
  }

  // type external or file
  return (
    <div className={`rotion-childpage ${Stylex(style.wrapper)}`}>
      <ChildPageLink block={block} href={href} link={link} query={query}>
        <span className={`rotion-childpage-icon ${Stylex(style.icon)}`}>
          <img className="rotion-childpage-icon-img" src={block.page.icon.src} alt="Icon" />
        </span>
        <div>
          <span className={`rotion-childpage-title ${Stylex(style.title)}`}>
            {title}
          </span>
        </div>
      </ChildPageLink>
    </div>
  )
}

export default ChildPageBlock
