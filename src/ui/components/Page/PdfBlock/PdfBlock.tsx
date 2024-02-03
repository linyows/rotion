import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../RichText/RichText'
import type { PdfBlockProps } from './PdfBlock.types'
import { PageIcon } from '../PageIcon'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
  },
  link: {
    display: 'grid',
    gridTemplate: 'repeat(1, 1fr) / 1.5rem 1fr',
    gap: '.4rem',
    margin: '.2rem 0 0',
    padding: '.6rem .3rem',
    textDecoration: 'none',
    color: '#333',
    alignItems: 'top',
    backgroundColor: {
      default: 'inhirit',
      ':hover': 'rgba(55, 53, 47, 0.08)',
    },
    borderRadius: '4px',
  },
  size: {
    fontSize: '.8rem',
    paddingLeft: '.5rem',
    color: '#888',
  },
})

const PdfBlock = ({ block }: PdfBlockProps) => {
  const { pdf } = block
  const url = (pdf.type === 'external') ? pdf.external.url : pdf.file.url
  const fileName = url.substring(url.lastIndexOf('/') + 1)
  // Byte to KB or MB
  const size = pdf.size > 9999 ? `${(Math.ceil(pdf.size / 1024 / 1000 * 10) / 10).toFixed(1)}MB` : `${(Math.ceil(pdf.size / 1024 * 10) / 10).toFixed(1)}KB`

  return (
    <div className={`rotion-pdf ${Stylex(style.wrapper)}`}>
      <a href={url} target="_blank" className={`rotion-pdf-link ${Stylex(style.link)}`} rel="noreferrer">
        <PageIcon name='file' />
        <span>
          {fileName}
          <span className={`rotion-pdf-size ${Stylex(style.size)}`}>
            {size}
          </span>
        </span>
        {pdf.caption.map((v: RichTextItemResponse, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </a>
    </div>
  )
}

export default PdfBlock
