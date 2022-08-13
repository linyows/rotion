import React from 'react'
import { TextObject } from './text'
import type {
  BlockObjectResponse,
} from '../../types'

export type EmbedBlockProps = {
  block: BlockObjectResponse
}

const EmbedBlock = ({ block }): React.FC<EmbedBlockProps> => {
  if (block.embed?.html === undefined) {
    console.log('unsupported embed:', block)
    return
  }
  const captions = block.embed.caption.map((v, i) => {
    return TextObject({ textObject: v, key: i})
  })

  return (
    <div className="embed">
      <div className="embed-inner" dangerouslySetInnerHTML={{ __html: block.embed.html }} />
      <div className="embed-caption">
        {captions}
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
