import React, { useState, useRef } from 'react'
import { usePdf } from '@mikecousins/react-pdf'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../../RichText/RichText'
import type { PdfBlockProps } from './PdfBlock.types'
import { Icon } from '../../Icon'
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
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
               ◀︎
              </button>
            </li>
            <li className="rotion-pdf-next">
              <button disabled={page === pdfDocument!.numPages} onClick={() => setPage(page + 1)}>
                ▶ 
              </button>
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
