import React from 'react'
import { RichText } from '../RichText'
import type { ImageBlockProps } from './ImageBlock.types'

export const ImageBlock = ({ block }: ImageBlockProps) => {
  return (
    <div className="rotion-image">
      <div className="rotion-image-area">
        <img className="rotion-image-img" src={block.image?.src} alt="Image" />
      </div>
      <div className="rotion-image-caption">
        {block.image.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default ImageBlock
