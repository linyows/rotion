import React from 'react'
import type { LinkedTagIfLinkedProps } from './LinkedTag.types'
import './LinkedTag.css'

const LinkedTagIfLinked = ({ pathname, link, query, children }: LinkedTagIfLinkedProps) => {
  const href = query ? { pathname, query } : pathname

  if (!href) {
    return (
      <span className="rotion-gallery-multiselect-tag">
        {children}
      </span>
    )
  }

  if (link) {
    const Link = link
    return (
      <Link className="rotion-gallery-multiselect-tag rotion-gallery-multiselect-link" href={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className="rotion-gallery-multiselect-tag rotion-gallery-multiselect-link" href={pathname}>
      {children}
    </a>
  )
}

export default LinkedTagIfLinked
