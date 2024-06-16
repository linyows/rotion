import type { VideoBlockObjectResponseEx, VideoFile, VideoExternal, RichTextItemResponse } from '../../../../exporter'

export interface VideoBlockProps {
  block: VideoBlockObjectResponseEx
}

export interface VideoFileProps {
  video: VideoFile
}

export interface VideoExternalProps {
  video: VideoExternal
}

export interface CaptionProps {
  caption: RichTextItemResponse[]
}
