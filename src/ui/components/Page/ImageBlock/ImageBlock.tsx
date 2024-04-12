import React from 'react'
import { RichText } from '../RichText'
import type { ImageBlockProps } from './ImageBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    textAlign: 'center',
    margin: 0,
    padding: '0 0 .5rem',
  },
  image: {
    display: 'flex',
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  caption: {
    margin: '.3rem .3rem 0',
    textAlign: 'left',
    color: tokens.thirdText,
    fontSize: '.95rem',
  },
})

export const ImageBlock = ({ block }: ImageBlockProps) => {
  return (
    <div className={`rotion-image ${Stylex(style.wrapper)}`}>
      <div className={`rotion-image-image ${Stylex(style.image)}`}>
        <img className={`rotion-image-img ${Stylex(style.img)}`} src={block.image?.src} alt="Image" />
      </div>
      <div className={`rotion-image-caption ${Stylex(style.caption)}`}>
        {block.image.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default ImageBlock
