import React, { useEffect } from 'react'
import { RichText } from '../../RichText'
import type { CaptionProps, VideoBlockProps, VideoExternalProps, VideoFileProps } from './VideoBlock.types'
import '../../tokens.css'
import './VideoBlock.css'

const Caption = ({ caption }: CaptionProps) => {
  return (
    <div className="rotion-video-caption">
      {caption.map((v, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </div>
  )
}

const Youtube = ({ video: { html, caption } }: VideoExternalProps) => {
  // const css = `
  // .rotion-video-youtube iframe {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  // }
  // `
  // <style type="text/css"> {css} </style>
  return (
    <div className="rotion-video">
      <div className="rotion-video-inner">
        <div className="rotion-video-html rotion-video-youtube" dangerouslySetInnerHTML={{ __html: html }} />
        <Caption caption={caption} />
      </div>
    </div>
  )
}

const Vimeo = ({ video: { html, caption } }: VideoExternalProps) => {
  return (
    <div className="rotion-video">
      <div className="rotion-video-inner">
        <div className="rotion-video-html rotion-video-vimeo" dangerouslySetInnerHTML={{ __html: html }} />
        <Caption caption={caption} />
      </div>
    </div>
  )
}

const Tiktok = ({ video: { html, caption } }: VideoExternalProps) => {
  const htmlWithRemovedScript = html.replace(/<script>.*/, '')
  const videoHtmlClass = 'rotion-video-tiktok'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    document.getElementsByClassName(videoHtmlClass)[0].appendChild(script)
  }, [])

  return (
    <div className="rotion-video">
      <div className="rotion-video-inner">
        <div className={`rotion-video-html ${videoHtmlClass}`} dangerouslySetInnerHTML={{ __html: htmlWithRemovedScript }} />
        <Caption caption={caption} />
      </div>
    </div>
  )
}

const External = ({ video: { html, caption } }: VideoExternalProps) => {
  return (
    <div className="rotion-video">
      <div className="rotion-video-inner">
        <div className="rotion-video-html" dangerouslySetInnerHTML={{ __html: html }} />
        <Caption caption={caption} />
      </div>
    </div>
  )
}

const File = ({ video: { src, caption, videoType } }: VideoFileProps) => {
  return (
    <div className="rotion-video">
      <div className="rotion-video-inner">
        <div className="rotion-video-file">
          {/* @ts-ignore */}
          <video src={src} type={videoType} controls playsinline preload="auto" width="100%">
            Download the <a href={src}>Video</a>
          </video>
        </div>
        <Caption caption={caption} />
      </div>
    </div>
  )
}

const VideoBlock = ({ block }: VideoBlockProps) => {
  const { video } = block

  switch (video?.type) {
    case 'file':
      if (!video.src) {
        console.log('The video source for this video block was undefined:', block)
        return <></>
      }
      return <File video={video} />

    case 'external':
      if (!video.html) {
        console.log('The html for this video block was undefined:', block)
        return <></>
      }
      if (video.html.includes('youtube')) {
        return <Youtube video={video} />
      }
      if (video.html.includes('vimeo')) {
        return <Vimeo video={video} />
      }
      if (video.html.includes('tiktok')) {
        return <Tiktok video={video} />
      }
      return <External video={video} />

    default:
      console.log('The video type is unknown:', block)
      return <></>
  }
}

export default VideoBlock
