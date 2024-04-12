import React from 'react'
import { RichText } from '../RichText'
import type { VideoBlockProps } from './VideoBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    width: '100%',
  },
  inner: {
    margin: 'auto',
  },
  html: {
    width: '100%',
    margin: 'auto',
    paddingBottom: '56.25%', /* 16:9 */
    position: 'relative',
    height: 0,
  },
  caption: {
    margin: '.3rem .3rem 0',
    textAlign: 'left',
    color: tokens.thirdText,
    fontSize: '.95rem',
  },
  youtube: {
    margin: 'auto',
  },
})
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

  const providerClass = (block.video.html.includes('youtube')) ? `rotion-video-youtube ${Stylex(style.youtube)}` : ''

  return (
    <div className={`rotion-video ${Stylex(style.wrapper)}`}>
      <div className={`rotion-video-inner ${Stylex(style.inner)}`}>
        {block.video.html.includes('youtube') && <style type="text/css"> {css} </style>}
        <div className={`rotion-video-html ${providerClass} ${Stylex(style.html)}`} dangerouslySetInnerHTML={{ __html: block.video.html }} />
        <div className={`rotion-video-caption ${Stylex(style.caption)}`}>
          {block.video.caption.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoBlock
