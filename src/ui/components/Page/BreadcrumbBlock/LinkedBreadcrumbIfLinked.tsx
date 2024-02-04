import React from 'react'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import type { LinkedBreadcrumbIfLinkedProps } from './LinkedBreadcrumbIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  link: {
    fontFamily: fontFamily.sansserif,
    textDecoration: 'none',
    color: '#333',
    fontSize: '.9rem',
    padding: '.2rem .3rem',
    borderRadius: '4px',
    backgroundColor: {
      default: 'inherit',
      ':hover': 'rgba(55, 53, 47, 0.08)',
    },
    cursor: 'pointer',
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
