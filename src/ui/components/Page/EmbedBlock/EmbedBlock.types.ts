import type { EmbedBlockObjectResponseEx, RichTextItemResponse } from '../../../../exporter'

export interface EmbedBlockProps {
  block: EmbedBlockObjectResponseEx
}

export interface EmbedProps {
  type: 'speakerdeck' | 'applemusic' | 'googlemap'
  html: string
  caption: RichTextItemResponse[]
}

export interface OembedProps {
  html: string
  caption: RichTextItemResponse[]
}
