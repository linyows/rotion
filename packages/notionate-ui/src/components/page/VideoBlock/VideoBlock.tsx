import React from 'react'
import TextBlock from '../TextBlock/TextBlock'
import type { VideoBlockProps } from './VideoBlock.types'

const VideoBlock = ({ block }: VideoBlockProps) => {
  if (block.video?.type !== 'external' || (block.video?.type === 'external' && block.video?.html === undefined)) {
    console.log('The html for this video block was undefined:', block)
    return <></>
  }

  const providerClass = (block.video.html.includes('youtube')) ? ' notionate-blocks-video-youtube' : ''

  return (
    <div className="notionate-blocks-video">
      <div className="notionate-blocks-video-inner">
        <div className={`notionate-blocks-video-html${providerClass}`} dangerouslySetInnerHTML={{ __html: block.video.html }} />
        <div className="notionate-blocks-video-caption">
          <TextBlock tag="span" block={block.video.caption} />
        </div>
      </div>
    </div>
  )
}

export default VideoBlock
