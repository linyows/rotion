import React from 'react'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import type { LinkedBreadcrumbIfLinkedProps } from './LinkedBreadcrumbIfLinked.types'

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
      <Link className="rotion-breadcrumb-link" href={{ pathname, query }}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className="rotion-breadcrumb-link" href={`${pathname}${queryToString(query)}`}>
        {children}
      </a>
    )
  }

  return (
    <span className="rotion-breadcrumb-link">
      {children}
    </span>
  )
}

export default LinkedBreadcrumbIfLinked
