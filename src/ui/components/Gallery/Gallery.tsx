import React from 'react'
import type { PageObjectResponseEx } from '../../../exporter'
import GalleryCard from './GalleryCard/GalleryCard'
import type { GalleryProps } from './Gallery.types'

const Gallery = ({ keys, db, href, link, query, preview, size = 'medium', fit = true }: GalleryProps) => {
  return (
    <div className={`rotion-gallery ${fit ? 'rotion-gallery-fit' : ''}`}>
      <div className={`rotion-gallery-inner rotion-gallery-${size}`}>
        {db.results.map((v) => (
          <GalleryCard
            key={v.id}
            keys={keys}
            page={v as PageObjectResponseEx}
            href={href || ''}
            link={link}
            query={query}
            preview={preview}
            size={size}
            fit={fit}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery
