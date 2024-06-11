import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../../RichText/RichText'
import type { PdfBlockProps } from './PdfBlock.types'
import '../../tokens.css'
import './PdfBlock.css'

const PdfBlock = ({ block }: PdfBlockProps) => {
  const { src, caption } = block.pdf

  return (
    <div className="rotion-pdf">
      <object data={src} type="application/pdf" className="rotion-pdf-object" width="100%" height="90vh"></object>
      {caption.length > 0 && <div className="rotion-pdf-caption">
        {caption.map((v: RichTextItemResponse, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>}
    </div>
  )
}

export default PdfBlock
