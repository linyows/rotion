import { RichText } from '../../RichText/index.js'
import type { ImageBlockProps } from './ImageBlock.types'
import '../../tokens.css'
import './ImageBlock.css'

export const ImageBlock = ({ block }: ImageBlockProps) => {
  let cname = 'rotion-image-ratio-unknown'
  if (block.image?.width && block.image.height) {
    const { width, height } = block.image
    cname = width > height ? 'rotion-image-ratio-landscape' : 'rotion-image-ratio-portrait'
  }

  return (
    <div className="rotion-image">
      <div className="rotion-image-area">
        <img className={`rotion-image-img ${cname}`} src={block.image?.src} alt="Image" />
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
