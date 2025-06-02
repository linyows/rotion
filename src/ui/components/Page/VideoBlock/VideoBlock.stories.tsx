import type { Meta, StoryObj } from '@storybook/react-vite'
import type { VideoBlockObjectResponseEx, RichTextItemResponse } from '../../../../exporter'
import VideoBlock from './VideoBlock'

/* RICH TEXT */
const richText: RichTextItemResponse = {
  type: 'text',
  text: {
    content: 'This video is cool.',
    link: null,
  },
  annotations: {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default',
  },
  plain_text: 'This video is cool.',
  href: null,
}

/* VIDEO BLOCK */
const block: VideoBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  created_time: '2020-02-22T22:22:22.000Z',
  last_edited_time: '2020-02-22T22:22:22.000Z',
  created_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab',
  },
  last_edited_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab',
  },
  has_children: false,
  archived: false,
  type: 'video',
  video: {
    caption: [richText],
    type: 'file',
    file: {
      url: 'https://prod-files-secure.s3.us-west-2.amazonaws.com/9c5c8bd8-2326-4257-98e7-557d511c9d37/417fa407-6779-4374-89ee-f47c8d22722e/Sample_5s_video.mp4?X-Amz-Algorithm=....',
      expiry_time: '2024-06-15T09:56:10.889Z',
    },
    src: '/files/block-7151c5e8-b035-479b-8d55-f65347a88d26-8eec7bc461808e0b8a28783d0bec1a3a22eb0821.mp4',
    videoType: 'video/mp4',
  },
  in_trash: false,
}

const meta = {
  title: 'Page/VideoBlock',
  component: VideoBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VideoBlock>

export default meta
type Story = StoryObj<typeof meta>

export const File: Story = {}

const youtube = structuredClone(block)
youtube.video = {
  caption: [richText],
  type: 'external',
  external: {
    url: 'https://youtu.be/2ncpb3auHOw?si=egykqR6viQTM9fNR',
  },
  html: '<iframe width="560" height="315" src="https://www.youtube.com/embed/2ncpb3auHOw?si=egykqR6viQTM9fNR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
}
export const Youtube: Story = {
  args: {
    block: youtube,
  },
}

const vimeo = structuredClone(block)
vimeo.video = {
  caption: [richText],
  type: 'external',
  external: {
    url: 'https://vimeo.com/michaelkoenig/earth',
  },
  html: '<iframe src="https://player.vimeo.com/video/32001208?h=acec7b3a82&color=ffffff&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>',
}
export const Vimeo: Story = {
  args: {
    block: vimeo,
  },
}
