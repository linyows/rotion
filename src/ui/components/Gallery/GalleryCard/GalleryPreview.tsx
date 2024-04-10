import React from 'react'
import Stylex from '@stylexjs/stylex'
import { gallery } from '../../tokens.stylex'

const heightList = {
  small: '100px',
  medium: '146px',
  large: '180px',
}

const style = Stylex.create({
  wrapper: {
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    borderBottom: gallery.imageBorderBottom,
    width: '100%',
  },
  fit: {
    objectFit: 'contain',
    objectPosition: 'center 50%',
  },
  nofit: {
    objectFit: 'cover',
    objectPosition: 'top center',
  },
  image: {
    width: '100%',
  },
})

export interface GalleryPreviewProps {
  src?: string
  size: 'small' | 'medium' | 'large'
  fit: boolean
}

const GalleryPreview = ({ src, size, fit }: GalleryPreviewProps) => {
  const height = heightList[size]
  return (
    <div className={`rotion-gallery-preview ${Stylex(style.wrapper)}`} style={{ height }}>
      {src && <img src={src} className={Stylex(style.image, fit ? style.fit : style.nofit)} style={{ height }} />}
    </div>
  )
}

export default GalleryPreview
