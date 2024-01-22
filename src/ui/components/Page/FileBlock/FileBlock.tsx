import React from 'react'
import type { RichTextItemResponse } from '../../../../exporter'

import RichText from '../RichText/RichText'
import type { FileBlockProps } from './FileBlock.types'

// TODO: Iimplement and design
const FileBlock = ({ block }: FileBlockProps) => {
  const { file } = block
  const url = (file.type === 'external') ? file.external.url : file.file.url
  return (
    <div className="notionate-blocks-file">
      {url}
      {file.caption.map((v: RichTextItemResponse, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </div>
  )
}

export default FileBlock
