import React from 'react'

export interface GalleryPreviewProps {
  src?: string
}

const GalleryPreview = ({ src }: GalleryPreviewProps) => {
  return (
    <div className="notionate-gallery-preview">
      {src && <img src={src} />}
    </div>
  )
}

export default GalleryPreview
