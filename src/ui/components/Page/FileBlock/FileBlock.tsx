import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'
import RichText from '../RichText/RichText'
import type { FileBlockProps } from './FileBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
  },
})

// TODO: Iimplement and design
const FileBlock = ({ block }: FileBlockProps) => {
  const { file } = block
  const url = (file.type === 'external') ? file.external.url : file.file.url
  return (
    <div className={`rotion-file ${Stylex(style.wrapper)}`}>
      {url}
      {file.caption.map((v: RichTextItemResponse, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </div>
  )
}

export default FileBlock
