import React from 'react'
import { RichText } from '../../Page/RichText'
import type { GalleryRichTextFieldProps } from './RichTextField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    padding: '0 10px 8px',
    display: 'block',
    fontSize: '13px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  small: {
    width: '180px',
  },
  medium: {
    width: '260px',
  },
  large: {
    width: '320px',
  },
})

const GalleryRichTextField = ({ payload, size }: GalleryRichTextFieldProps) => {
  return (
    <div className={`rotion-gallery-richtext ${Stylex(style.wrapper)} ${Stylex(style[size || 'medium'])}`}>
      <RichText textObject={payload.rich_text} />
    </div>
  )
}

export default GalleryRichTextField
