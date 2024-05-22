import React from 'react'
import type { LinkedTagIfLinkedProps } from './LinkedTag.types'
import './LinkedTag.css'

const LinkedTagIfLinked = ({ pathname, link, query, children }: LinkedTagIfLinkedProps) => {
  if (!pathname) {
    return (
      <span className="rotion-gallery-select-tag">
        {children}
      </span>
    )
  }

  if (link) {
    const href = query ? { pathname, query } : pathname
    const Link = link
    return (
      <Link className="rotion-gallery-select-tag rotion-gallery-select-link" href={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className="rotion-gallery-select-tag rotion-gallery-select-link" href={pathname}>
      {children}
    </a>
  )
}

export default LinkedTagIfLinked
