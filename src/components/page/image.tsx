import React from 'react'
import { TextObject } from './text'
import type {
  ImageBlockObjectResponseEx,
} from '../../types'

export type ImageBlockProps = {
  block: ImageBlockObjectResponseEx
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block }) => {
  const captions = block.image.caption?.map((v, i) => {
    return TextObject({ textObject: v, key: `${i}` })
  })

  return (
    <div className="image-block">
      <div className="image-inner-block">
        <img className="image" src={block.image?.src} alt="" />
      </div>
      <div className="image-caption">
        {captions}
      </div>
      <style jsx>{`
        .image {
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
        .image-caption {
          margin: .3rem .3rem 0;
          text-align: left;
          color: #888;
          font-size: .95rem;
        }
        .image-block {
          text-align: center;
          margin: 0;
          padding: 0 0 .5rem;
        }
        .image-inner-block {
          display: flex;
        }
      `}</style>
    </div>
  )
}

export default ImageBlock
