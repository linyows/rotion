import type { VideoBlockObjectResponseEx, VideoExternal, VideoFile } from '../../../../exporter/index.js'

export interface VideoBlockProps {
  block: VideoBlockObjectResponseEx
}

export interface VideoFileProps {
  video: VideoFile
}

export interface VideoExternalProps {
  video: VideoExternal
}
