import React from 'react'
import type { Link } from '../../types'
import type { GalleryLinkedCardProps } from './GalleryLinkedCard.types'

const GalleryLinkedCard = ({ children, link, query, href }: GalleryLinkedCardProps) => {
  if (link && query) {
    const Link = link as unknown as Link
    return (
      <Link href={{ pathname: href, query }}>
        <div className="notionate-gallery-a">
          {children}
        </div>
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link href={href}>
        <div className="notionate-gallery-a">
          {children}
        </div>
      </Link>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default GalleryLinkedCard
