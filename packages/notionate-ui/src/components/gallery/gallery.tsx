import React from 'react'
import type { PageObjectResponseEx } from 'notionate-pages'
import GalleryCard from './GalleryCard/GalleryCard'
import type { GalleryProps } from './Gallery.types'

const Gallery = ({ keys, db, href, link, query, preview, size, fit }: GalleryProps) => {
  const fitClass = `${fit ? ' notionate-gallery-fit' : ''}`
  const sizeClass = ` notionate-gallery-${size || 'medium'}`
  return (
    <div className={`notionate-gallery${fitClass}`}>
      <div className={`notionate-gallery-inner${sizeClass}`}>
        {db.results.map((v) => (
          <GalleryCard key={v.id} keys={keys} page={v as PageObjectResponseEx} href={href || ''} link={link} query={query} preview={preview} />
        ))}
      </div>
    </div>
  )
}

export default Gallery
