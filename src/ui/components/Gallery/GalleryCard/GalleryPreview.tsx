import React from 'react'
import Stylex from '@stylexjs/stylex'

const style = Stylex.create({
  wrapper: {
    aspectRatio: '16 / 9',
    overflow: 'hidden',
  },
  fit: {
    objectFit: 'contain',
    objectPosition: 'center 50%',
    borderBottom: '1px solid rgba(55, 53, 47, 0.09)',
  },
  nofit: {
    objectFit: 'cover',
    objectPosition: 'top 50%',
  },
  small: {
    height: '101.25px',
    width: '100%',
  },
  medium: {
    height: '146.25px',
    width: '100%',
  },
  large: {
    height: '180px',
    width: '100%',
  },
})

export interface GalleryPreviewProps {
  src?: string
  size: 'small' | 'medium' | 'large'
  fit: boolean
}

const GalleryPreview = ({ src, size, fit }: GalleryPreviewProps) => {
  let classArray = [Stylex(style[size])]
  if (fit) {
    classArray.push(Stylex(style.fit))
  } else {
    classArray.push(Stylex(style.nofit))
  }
  return (
    <div className={`rotion-gallery-preview ${Stylex(style.wrapper)}`}>
      {src && <img src={src} className={classArray.join(' ')} />}
    </div>
  )
}

export default GalleryPreview
