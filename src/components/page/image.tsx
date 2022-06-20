import React from 'react'
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
  const caption = block.image.caption as RichText[]
  return (
    <div className="image-block">
      <div className="image-inner-block">
        <img src={block.image?.src} alt="" />
      </div>
      {caption.map((c, i) => (
        <p key={i}>{c.text.content}</p>
      ))}
      <style jsx>{`
        img {
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
        p {
          margin: var(--spacing-5) 0 0;
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
