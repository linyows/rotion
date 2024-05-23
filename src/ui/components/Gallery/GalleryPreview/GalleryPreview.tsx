import React from 'react'
import type { GalleryPreviewProps } from './GalleryPreview.types'
import './GalleryPreview.css'

const defaultHeight = {
  small: '100px',
  medium: '146px',
  large: '180px',
}

const GalleryPreview = ({ src, options }: GalleryPreviewProps) => {
  const { size, height, fit } = options || {}

  let h = ''
  if (size && height) {
    if (typeof(height) === 'string') {
      h = height
    } else {
      h = height[size]
    }
  } else {
    h = defaultHeight[size || 'medium']
  }

  return (
    <div className="rotion-gallery-preview" style={{ height: h }}>
      <img src={src} className={`rotion-gallery-preview-img rotion-gallery-preview-${fit ? 'fit' : 'nofit'}`} style={{ height: h }} />
    </div>
  )
}

export default GalleryPreview
