import type { Meta, StoryObj } from '@storybook/react'
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
    type: 'external',
    external: {
      url: 'https://youtu.be/2ncpb3auHOw?si=egykqR6viQTM9fNR',
    },
    html: '<iframe width="560" height="315" src="https://www.youtube.com/embed/2ncpb3auHOw?si=egykqR6viQTM9fNR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  },
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

export const Youtube: Story = {}
