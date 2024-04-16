import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../RichText/RichText'
import type { FileBlockProps } from './FileBlock.types'
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

const FileBlock = ({ block }: FileBlockProps) => {
  const { file } = block
  // Byte to KB or MB
  const size = file.size > 9999 ? `${(Math.ceil(file.size / 1024 / 1000 * 10) / 10).toFixed(1)}MB` : `${(Math.ceil(file.size / 1024 * 10) / 10).toFixed(1)}KB`

  return (
    <div className={`rotion-file ${Stylex(style.wrapper)}`}>
      <a href={file.src} target="_blank" className={`rotion-file-link ${Stylex(style.link)}`} rel="noreferrer">
        <PageIcon name='file' />
        <span>
          {file.name}
          <span className={`rotion-file-size ${Stylex(style.size)}`}>
            {size}
          </span>
        </span>
      </a>
      {file.caption.length > 0 && <div className={`rotion-file-caption ${Stylex(style.caption)}`}>
        {file.caption.map((v: RichTextItemResponse, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>}
    </div>
  )
}

export default FileBlock
