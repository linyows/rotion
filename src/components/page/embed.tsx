import React from 'react'
import TextBlock from './text'
import type {
  EmbedBlockObjectResponseEx,
} from '../../types'

export type EmbedBlockProps = {
  block: EmbedBlockObjectResponseEx
}

const EmbedBlock: React.FC<EmbedBlockProps> = ({ block }) => {
  if (block.embed?.html === undefined) {
    console.log('unsupported embed:', block)
    return <></>
  }

  return (
    <div className="embed">
      <div className="embed-inner" dangerouslySetInnerHTML={{ __html: block.embed.html }} />
      <div className="embed-caption">
        {TextBlock({ tag: 'span', block: block.embed.caption })}
      </div>
      <style jsx>{`
        .embed {
          width: 100%;
          text-align: center;
        }
        .embed-inner {
          width: 100%;
          text-align: center;
        }
        .embed-caption {
          margin: .3rem .3rem 0;
          text-align: left;
          color: #888;
          font-size: .95rem;
        }
      `}</style>
    </div>
  )
}

export default EmbedBlock
