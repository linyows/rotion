import React from 'react'
import type { Link } from '../../types.js'
import type { GalleryLinkedCardProps } from './GalleryLinkedCard.types'

const GalleryLinkedCard = ({ children, link, query, pathname }: GalleryLinkedCardProps) => {
  if (pathname && link && query) {
    const Link = link as unknown as Link
    return (
      <Link className="rotion-gallery-card rotion-gallery-link" href={{ pathname, query }}>
        {children}
      </Link>
    )
  } else if (pathname && link) {
    const Link = link
    return (
      <Link className="rotion-gallery-card rotion-gallery-link" href={pathname}>
        {children}
      </Link>
    )
  } else if (pathname) {
    return (
      <a className="rotion-gallery-card rotion-gallery-link" href={pathname}>
        {children}
      </a>
    )
  }

  return (
    <div className="rotion-gallery-card">
      {children}
    </div>
  )
}

export default GalleryLinkedCard
