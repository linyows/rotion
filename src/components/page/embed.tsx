import React from 'react'
import TextBlock from './text'
import type {
  EmbedBlockObjectResponseEx,
} from '../../server/types'

export type EmbedBlockProps = {
  block: EmbedBlockObjectResponseEx
}

const EmbedBlock: React.FC<EmbedBlockProps> = ({ block }) => {
  if (block.embed?.html === undefined) {
    console.log('The html property for this embed block was undefined:', block)
    return <></>
  }

  return (
    <div className="notionate-blocks-embed">
      <div className="notionate-blocks-embed-inner" dangerouslySetInnerHTML={{ __html: block.embed.html }} />
      <div className="notionate-blocks-embed-caption">
        <TextBlock tag="span" block={block.embed.caption} />
      </div>
    </div>
  )
}

export default EmbedBlock
