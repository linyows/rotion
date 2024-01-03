import React from 'react'
import TextBlock from './text'
import type {
  ImageBlockObjectResponseEx,
} from 'notionate-pages'

export type ImageBlockProps = {
  block: ImageBlockObjectResponseEx
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block }) => {
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
