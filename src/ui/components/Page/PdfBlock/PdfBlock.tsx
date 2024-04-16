import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../RichText/RichText'
import type { PdfBlockProps } from './PdfBlock.types'
import { PageIcon } from '../PageIcon'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
  },
  link: {
    display: 'grid',
    gridTemplate: 'repeat(1, 1fr) / 1.5rem 1fr',
    gap: '.4rem',
    margin: '.2rem 0 0',
    padding: '.6rem .3rem',
    textDecoration: link.textDecoration,
    color: link.color,
    alignItems: 'top',
    backgroundColor: {
      default: link.bgColor,
      ':hover': link.bgColorHover,
    },
    borderRadius: tokens.borderRadius,
  },
  size: {
    fontSize: '.8rem',
    paddingLeft: '.5rem',
    color: tokens.thirdText,
  },
  caption: {
    color: tokens.thirdText,
    paddingTop: '.1rem',
    paddingLeft: '.4rem',
  },
})

const PdfBlock = ({ block }: PdfBlockProps) => {
  const { pdf } = block
  const fileName = pdf.src.substring(pdf.src.lastIndexOf('/') + 1)
  // Byte to KB or MB
  const size = pdf.size > 9999 ? `${(Math.ceil(pdf.size / 1024 / 1000 * 10) / 10).toFixed(1)}MB` : `${(Math.ceil(pdf.size / 1024 * 10) / 10).toFixed(1)}KB`

  return (
    <div className={`rotion-pdf ${Stylex(style.wrapper)}`}>
      <a href={pdf.src} target="_blank" className={`rotion-pdf-link ${Stylex(style.link)}`} rel="noreferrer">
        <PageIcon name='file' />
        <span>
          {fileName}
          <span className={`rotion-pdf-size ${Stylex(style.size)}`}>
            {size}
          </span>
        </span>
      </a>
      {pdf.caption.length > 0 && <div className={`rotion-pdf-caption ${Stylex(style.caption)}`}>
        {pdf.caption.map((v: RichTextItemResponse, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>}
    </div>
  )
}

export default PdfBlock
