import React from 'react'
import type { PageObjectResponseEx } from '../../../exporter'
import GalleryCard from './GalleryCard/GalleryCard'
import type { GalleryProps } from './Gallery.types'
import '../tokens.css'
import './Gallery.css'

const Gallery = ({ keys, db, options }: GalleryProps) => {
  if (!options) {
    options = {}
  }
  if (!options.image) {
    options.image = {}
  }
  if (!options?.image.preview) {
    options.image.preview = 'cover'
  }
  if (options?.image.fit === undefined) {
    options.image.fit = true
  }
  if (!options?.image.size) {
    options.image.size = 'medium'
  }

  return (
    <div className={`rotion-gallery ${options.image.fit ? 'rotion-gallery-fit' : ''}`}>
      <div className={`rotion-gallery-inner rotion-gallery-${options.image.size}`}>
        {db.results.map((v) => (
          <GalleryCard key={v.id} keys={keys} page={v as PageObjectResponseEx} options={options} />
        ))}
      </div>
    </div>
  )
}

export default Gallery
