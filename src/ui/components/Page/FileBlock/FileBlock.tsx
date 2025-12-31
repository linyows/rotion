import type { RichTextItemResponse } from '../../../../exporter/index.js'
import { Icon } from '../../Icon/index.js'
import RichText from '../../RichText/RichText.js'
import type { FileBlockProps } from './FileBlock.types'
import '../../tokens.css'
import './FileBlock.css'
import '../../Icon/Icon.css'

const FileBlock = ({ block }: FileBlockProps) => {
  const { file } = block
  // Byte to KB or MB
  const size =
    file.size > 9999
      ? `${(Math.ceil((file.size / 1024 / 1000) * 10) / 10).toFixed(1)}MB`
      : `${(Math.ceil((file.size / 1024) * 10) / 10).toFixed(1)}KB`

  return (
    <div className="rotion-file">
      <a href={file.src} target="_blank" className="rotion-file-link" rel="noreferrer">
        <Icon name="file" />
        <span>
          {file.name}
          <span className="rotion-file-size">{size}</span>
        </span>
      </a>
      {file.caption.length > 0 && (
        <div className="rotion-file-caption">
          {file.caption.map((v: RichTextItemResponse, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FileBlock
