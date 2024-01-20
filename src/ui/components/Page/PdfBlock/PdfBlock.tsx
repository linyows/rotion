import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../TextBlock/RichText/RichText'
import type { PdfBlockProps } from './PdfBlock.types'

// TODO: Iimplement and design
const PdfBlock = ({ block }: PdfBlockProps) => {
  const { pdf } = block
  const url = (pdf.type === 'external') ? pdf.external.url : pdf.file.url
  return (
    <div className="notionate-blocks-pdf">
      {url}
      {pdf.caption.map((v: RichTextItemResponse, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </div>
  )
}

export default PdfBlock
