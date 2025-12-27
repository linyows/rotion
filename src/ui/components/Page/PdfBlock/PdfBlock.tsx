'use client'

import React, { useState, useRef } from 'react'
import RichText from '../../RichText/RichText'
import { usePdf } from './Pdf'
import { Icon } from '../../Icon'
import type { RichTextItemResponse } from '../../../../exporter'
import type { PdfBlockProps } from './PdfBlock.types'
import '../../tokens.css'
import './PdfBlock.css'

const PdfBlock = ({ block }: PdfBlockProps) => {
  const { src, caption } = block.pdf
  const [page, setPage] = useState(1)
  const canvasRef = useRef(null)

  const { pdfDocument } = usePdf({
    file: src,
    page,
    canvasRef,
  })

  return (
    <div className="rotion-pdf">
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav className="rotion-pdf-nav">
          <ul className="rotion-pdf-pager">
            <li className="rotion-pdf-prev">
              <span className={`rotion-pdf-prevnext ${page === 1 ? 'rotion-pdf-prevnext-disabled' : ''}`} onClick={() => setPage(page - 1)}>
               ◀︎
              </span>
            </li>
            <li className="rotion-pdf-next">
              <span className={`rotion-pdf-prevnext ${page === pdfDocument!.numPages ? 'rotion-pdf-prevnext-disabled' : ''}`} onClick={() => setPage(page + 1)}>
                ▶
              </span>
            </li>
          </ul>
          <a href={src} className="rotion-pdf-link" title="Download PDF" target="_blank" rel="noopener noreferrer">
            <Icon name="downloadfile" width="20px" height="20px" />
          </a>
        </nav>
      )}
      {!pdfDocument && <span>Loading...</span>}
      <canvas className="rotion-pdf-canvas" ref={canvasRef} />
      {caption.length > 0 && <div className="rotion-pdf-caption">
        {caption.map((v: RichTextItemResponse, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>}
    </div>
  )
}

export default PdfBlock
