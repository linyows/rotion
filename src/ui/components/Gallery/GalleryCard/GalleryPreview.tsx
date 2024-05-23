import React from 'react'
import type { GalleryPreviewProps } from './GalleryPreview.types'
import './GalleryPreview.css'

const defaultHeight = {
  small: '100px',
  medium: '146px',
  large: '180px',
}

const GalleryPreview = ({ src, options }: GalleryPreviewProps) => {
  let h = ''
  if (options && options.size && options.height) {
    if (typeof(options.height) === 'string') {
      h = options.height
    } else {
      h = options.height[options.size]
    }
  } else {
    h = defaultHeight[options?.size || 'medium']
  }

  const className = `rotion-gallery-preview-img rotion-gallery-preview-${options?.fit ? 'fit' : 'nofit'}`

  return (
    <div className="rotion-gallery-preview" style={{ height: h }}>
      {src && <img src={src} className={className} style={{ height: h }} />}
    </div>
  )
}

export default GalleryPreview
