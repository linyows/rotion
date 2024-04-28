import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../../RichText/RichText'
import type { PdfBlockProps } from './PdfBlock.types'
import { PageIcon } from '../PageIcon'

const PdfBlock = ({ block }: PdfBlockProps) => {
  const { pdf } = block
  const fileName = pdf.src.substring(pdf.src.lastIndexOf('/') + 1)
  // Byte to KB or MB
  const size = pdf.size > 9999 ? `${(Math.ceil(pdf.size / 1024 / 1000 * 10) / 10).toFixed(1)}MB` : `${(Math.ceil(pdf.size / 1024 * 10) / 10).toFixed(1)}KB`

  return (
    <div className="rotion-pdf">
      <a href={pdf.src} target="_blank" className="rotion-pdf-link" rel="noreferrer">
        <PageIcon name='file' />
        <span>
          {fileName}
          <span className="rotion-pdf-size">
            {size}
          </span>
        </span>
      </a>
      {pdf.caption.length > 0 && <div className="rotion-pdf-caption">
        {pdf.caption.map((v: RichTextItemResponse, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>}
    </div>
  )
}

export default PdfBlock
