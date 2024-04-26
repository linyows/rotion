import React from 'react'
import { RichText } from '../RichText'
import type { VideoBlockProps } from './VideoBlock.types'

const css = `
.rotion-video-youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`

const VideoBlock = ({ block }: VideoBlockProps) => {
  if (block.video?.type !== 'external' || (block.video?.type === 'external' && block.video?.html === undefined)) {
    console.log('The html for this video block was undefined:', block)
    return <></>
  }

  const providerClass = (block.video.html.includes('youtube')) ? 'rotion-video-youtube' : ''

  return (
    <div className="rotion-video">
      <div className="rotion-video-inner">
        {block.video.html.includes('youtube') && <style type="text/css"> {css} </style>}
        <div className={`rotion-video-html ${providerClass}`} dangerouslySetInnerHTML={{ __html: block.video.html }} />
        <div className="rotion-video-caption">
          {block.video.caption.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoBlock
