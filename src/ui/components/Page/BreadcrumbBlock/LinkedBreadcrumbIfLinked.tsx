import React from 'react'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import type { LinkedBreadcrumbIfLinkedProps } from './LinkedBreadcrumbIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'

const style = Stylex.create({
  link: {
    fontSize: '.9rem',
    padding: '.2rem .3rem',
    fontFamily: tokens.fontFamily,
    borderRadius: tokens.borderRadius,
    backgroundColor: {
      default: link.bgColor,
      ':hover': link.bgColorHover,
    },
    cursor: link.cursor,
    textDecoration: link.textDecoration,
    color: {
      default: link.color,
      ':hover': link.colorHover,
    },
  },
})

function buildPathname (id: string, name: string, href?: string) {
  if (href === '/') {
    return href
  }

  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  let file = ''

  if (slugKey === 'id') {
    file = id
  } else {
    file = encodeURIComponent(name.toLowerCase()).replace(/%20/g, '-')
  }

  return `${path}${file}`
}

const LinkedBreadcrumbIfLinked = ({ breadcrumb, link, href, query, children }: LinkedBreadcrumbIfLinkedProps) => {
  const { id, name } = breadcrumb
  const pathname = buildPathname(id, name, href)

  if (link && href) {
    const Link = link
    return (
      <Link className={`rotion-blocks-breadcrumb-a ${Stylex(style.link)}`} href={{ pathname, query }}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={`rotion-blocks-breadcrumb-a ${Stylex(style.link)}`} href={`${pathname}${queryToString(query)}`}>
        {children}
      </a>
    )
  }

  return (
    <span className={`rotion-blocks-breadcrumb-a ${Stylex(style.link)}`}>
      {children}
    </span>
  )
}

export default LinkedBreadcrumbIfLinked
