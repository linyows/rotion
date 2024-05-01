import React from 'react'
import type { LinkedTitleIfLinkedProps } from './LinkedTitleIfLinked.types'
import './LinkedTitleIfLinked.css'

const LinkedTitleIfLinked = ({ path, slug, link, query, children }: LinkedTitleIfLinkedProps) => {
  if (!path && !slug) {
    return (
      <span className="rotion-table-title-link">
        {children}
      </span>
    )
  }
  const pathname = `${path}${slug}`
  const href = link && query ? { pathname, query } : pathname

  if (link) {
    const Link = link
    return (
      <Link className="rotion-table-title-link" href={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className="rotion-table-title-link" href={pathname}>
      {children}
    </a>
  )
}

export default LinkedTitleIfLinked
