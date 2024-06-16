import React from 'react'
import RichText from './RichText'
import type { CaptionProps } from './RichText.types'

const Caption = ({ type, caption }: CaptionProps) => {
  return (
    <div className={`rotion-${type}-caption`}>
      {caption.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </div>
  )
}

export default Caption
