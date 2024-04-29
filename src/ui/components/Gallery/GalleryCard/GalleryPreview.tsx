import React from 'react'

export interface GalleryPreviewProps {
  src?: string
  size: 'small' | 'medium' | 'large'
  fit: boolean
}

const GalleryPreview = ({ src, size, fit }: GalleryPreviewProps) => {
  const heightList = {
    small: '100px',
    medium: '146px',
    large: '180px',
  }
  const height = heightList[size]
  const className = `rotion-gallery-preview-img rotion-gallery-preview-${fit ? 'fit' : 'nofit'}`
  return (
    <div className="rotion-gallery-preview" style={{ height }}>
      {src && <img src={src} className={className} style={{ height }} />}
    </div>
  )
}

export default GalleryPreview
