import React from 'react'
import type { PageObjectResponseEx } from '../../../exporter'
import GalleryCard from './GalleryCard/GalleryCard'
import type { GalleryProps } from './Gallery.types'
import Stylex from '@stylexjs/stylex'
import { gallery, tokens } from '../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
  },
  inner: {
    position: 'relative',
    paddingBottom: '1rem',
    display: 'grid',
    gap: '16px',
  },
  small: {
    gridTemplateColumns: gallery.gridTemplateColumnsSmall,
  },
  medium: {
    gridTemplateColumns: gallery.gridTemplateColumnsMedium,
  },
  large: {
    gridTemplateColumns: gallery.gridTemplateColumnsLarge,
  },
})

const Gallery = ({ keys, db, href, link, query, preview, size = 'medium', fit = true }: GalleryProps) => {
  return (
    <div className={`rotion-gallery ${fit ? 'rotion-gallery-fit' : ''}`}>
      <div className={`rotion-gallery-inner rotion-gallery-${size} ${Stylex(style.inner)} ${Stylex(style[size])}`}>
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
