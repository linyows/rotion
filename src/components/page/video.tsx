import React from 'react'
import { TextObject } from './text'
import type {
  BlockObjectResponse,
} from '../../types'

export type VideoBlockProps = {
  block: BlockObjectResponse
}

const VideoBlock = ({ block }): React.FC<VideoBlockProps> => {
  if (block.video?.html === undefined) {
    console.log('unsupported video:', block)
    return
  }

  // 16:9
  const baseWidth = 800
  const ratioW = 16
  const ratioH = 9
  const w = `${baseWidth}px`
  const h = `${ratioH * baseWidth / ratioW}px`

  const html = block.video.html
    .replace('width="100%"', `width="${w}"`)
    .replace('height="100%"', `height="${h}"`)

  const captions = block.video.caption.map((v, i) => {
    return TextObject({ textObject: v, key: i})
  })

  return (
    <div className="video">
      <div className="video-inner">
        <div className="video-html" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="video-caption">
          {captions}
        </div>
      </div>
      <style jsx>{`
        .video {
          width: 100%;
        }
        .video-inner {
          max-width: ${w};
          margin: auto;
        }
        .video-html {
          width: 100%;
          margin: auto;
        }
        .video-caption {
          margin: .3rem .3rem 0;
          text-align: left;
          color: #888;
          font-size: .95rem;
        }
      `}</style>
    </div>
  )
}

export default VideoBlock
