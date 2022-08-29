import React from 'react'
import TextBlock from './text'
import type {
  VideoBlockObjectResponseEx,
} from '../../types'

export type VideoBlockProps = {
  block: VideoBlockObjectResponseEx
}

const VideoBlock: React.FC<VideoBlockProps> = ({ block }) => {
  if (block.video?.type !== 'external' || (block.video?.type === 'external' && block.video?.html === undefined)) {
    console.log('unsupported video:', block)
    return <></>
  }

  // 16:9
  const baseWidth = 800
  const ratioW = 16
  const ratioH = 9
  const w = `${baseWidth}px`
  const h = `${ratioH * baseWidth / ratioW}px`

  const html = block.video.html
    .replace('height="100%"', `height="${h}"`)

  const style = {
    maxWidth: w,
  }

  return (
    <div className="notionate-blocks-video">
      <div className="notionate-blocks-video-inner" style={style}>
        <div className="notionate-blocks-video-html" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="notionate-blocks-video-caption">
          <TextBlock tag="span" block={block.video.caption} />
        </div>
      </div>
    </div>
  )
}

export default VideoBlock
