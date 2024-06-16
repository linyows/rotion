import type { VideoBlockObjectResponseEx, VideoFile, VideoExternal } from '../../../../exporter'

export interface VideoBlockProps {
  block: VideoBlockObjectResponseEx
}

export interface VideoFileProps {
  video: VideoFile
}

export interface VideoExternalProps {
  video: VideoExternal
}
