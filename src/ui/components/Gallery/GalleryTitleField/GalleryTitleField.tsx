import React from 'react'
import type { GalleryTitleFieldProps } from './GalleryTitleField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    fontSize: '.9rem',
    width: '100%',
    padding: '10px 10px 0',
  }
})

const GalleryTitleField = ({ payload }: GalleryTitleFieldProps) => {
  const title = payload.map(v => {
    const richtext = v.title
    switch (richtext.type) {
      case 'text':
        return richtext.text.content
      case 'mention':
        return richtext.mention.type
      default:
        return richtext.equation.expression
    }
  }).join(',')

  return (
    <div className={`rotion-gallery-title ${Stylex(style.wrapper)}`}>
      {title}
    </div>
  )
}

export default GalleryTitleField
