import React from 'react'
import { TextObject } from './text'
import type {
  BlockObjectResponse,
  RichText,
} from '../../types'

export type ImageBlockProps = {
  block: BlockObjectResponse
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block }) => {
  if (block.image?.caption === undefined) {
    return (<></>)
  }
  const captions = block.image.caption.map((v, i) => {
    return TextObject({ textObject: v, key: i})
  })

  return (
    <div className="image-block">
      <div className="image-inner-block">
        <img src={block.image?.src} alt="" />
      </div>
      <div className="image-caption">
        {captions}
      </div>
      <style jsx>{`
        img {
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
          margin: 0 0 var(--spacing-10);
        }
        .image-inner-block {
          display: flex;
        }
      `}</style>
    </div>
  )
}

export default ImageBlock
