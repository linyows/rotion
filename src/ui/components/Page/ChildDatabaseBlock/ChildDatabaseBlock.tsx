import React from 'react'
import type { ChildDatabaseBlockProps, ChildDatabaseLinkProps } from './ChildDatabaseBlock.types'
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
    lineHeight: tokens.lineHeight,
  },
  icon: {
    overflow: 'hidden',
  },
})

const ChildDatabaseLink = ({ block, href, link, query, children }: ChildDatabaseLinkProps) => {
  const title = block.child_database.title
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? block.database.id : encodeURIComponent(title.toLowerCase()).replace(/%20/g, '-')

  if (!href) {
    return (
      <div className={`rotion-childdatabase-link ${Stylex(style.link)}`}>
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
      <Link className={`rotion-childdatabase-link ${Stylex(style.link)}`} href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  }

  return (
    <a className={`rotion-childdatabase-link ${Stylex(style.link)}`} href={`${path}${file}${queryToString(query)}`}>
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
      <div className={`rotion-childdatabase ${Stylex(style.wrapper)}`}>
        <ChildDatabaseLink block={block} href={href} link={link} query={query}>
          <span className={`rotion-childdatabase-icon ${Stylex(style.icon)}`}>
            {'️-'}
          </span>
          <div>
            <span className={`rotion-childdatabase-title ${Stylex(style.title)}`}>
              {title}
            </span>
          </div>
        </ChildDatabaseLink>
      </div>
    )
  }

  if (block.database.icon.type === 'emoji') {
    return (
      <div className={`rotion-childdatabase ${Stylex(style.wrapper)}`}>
        <ChildDatabaseLink block={block} href={href} link={link} query={query}>
          <span className={`rotion-childdatabase-icon ${Stylex(style.icon)}`}>
            {block.database.icon.emoji}
          </span>
          <div>
            <span className={`rotion-childdatabase-title ${Stylex(style.title)}`}>
              {title}
            </span>
          </div>
        </ChildDatabaseLink>
      </div>
    )
  }

  // type external or file
  return (
    <div className={`rotion-childdatabase ${Stylex(style.wrapper)}`}>
      <ChildDatabaseLink block={block} href={href} link={link} query={query}>
        <span className={`rotion-childdatabase-icon ${Stylex(style.icon)}`}>
          <img className="rotion-childdatabase-icon-img" src={block.database.icon.src} alt="Icon" />
        </span>
        <div>
          <span className={`rotion-childdatabase-title ${Stylex(style.title)}`}>
            {title}
          </span>
        </div>
      </ChildDatabaseLink>
    </div>
  )
}

export default ChildDatabaseBlock
