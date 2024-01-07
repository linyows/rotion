import React from 'react'
import TextBlock from '../TextBlock'
import type { ImageBlockProps } from './ImageBlock.types'

export const ImageBlock = ({ block }: ImageBlockProps) => {
  return (
    <div className="notionate-blocks-image">
      <div className="notionate-blocks-image-inner">
        <img className="notionate-blocks-image-img" src={block.image?.src} alt="" />
      </div>
      <div className="notionate-blocks-image-caption">
        <TextBlock tag="span" block={block.image.caption} />
      </div>
    </div>
  )
}

export default ImageBlock
