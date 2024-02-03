import React from 'react'
import type { Link } from '../../types'
import type { GalleryLinkedCardProps } from './GalleryLinkedCard.types'

const GalleryLinkedCard = ({ children, link, query, href }: GalleryLinkedCardProps) => {
  if (link && query) {
    const Link = link as unknown as Link
    return (
      <Link className="rotion-gallery-link" href={{ pathname: href, query }}>
        {children}
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link className="rotion-gallery-link" href={href}>
        {children}
      </Link>
    )
  }

  return (
    <div className="rotion-gallery-link">
      {children}
    </div>
  )
}

export default GalleryLinkedCard
