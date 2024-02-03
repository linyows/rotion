import type { Meta, StoryObj } from '@storybook/react'
import type { EmbedBlockObjectResponseEx } from '../../../../exporter'
import EmbedBlock from './EmbedBlock'

const block: EmbedBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  created_time: '',
  last_edited_time: '',
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
  type: 'embed',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  embed: {
    caption: [
      {
        type: 'text',
        text: {
          content: 'Nice',
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
        plain_text: 'Nice',
        href: null,
      },
    ],
    url: 'https://twitter.com/jack/status/1247616214769086465',
    html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I’m moving $1B of my Square equity (~28% of my wealth) to <a href="https://twitter.com/hashtag/startsmall?src=hash&amp;ref_src=twsrc%5Etfw">#startsmall</a> LLC to fund global COVID-19 relief. After we disarm this pandemic, the focus will shift to girl’s health and education, and UBI. It will operate transparently, all flows tracked here: <a href="https://t.co/hVkUczDQmz">https://t.co/hVkUczDQmz</a></p>&mdash; jack (@jack) <a href="https://twitter.com/jack/status/1247616214769086465?ref_src=twsrc%5Etfw">April 7, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n\n',
  },
}

const meta = {
  title: 'Page/EmbedBlock',
  component: EmbedBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmbedBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Twitter: Story = {}

const sd = structuredClone(block)
sd.embed.url = 'https://speakerdeck.com/lara/designing-for-performance'
sd.embed.html = '<iframe id="talk_frame_78036" class="speakerdeck-iframe" src="//speakerdeck.com/player/64c73790385101315ae85eae0478e863" width="710" height="399" style="aspect-ratio:710/399; border:0; padding:0; margin:0; background:transparent;" frameborder="0" allowtransparency="true" allowfullscreen="allowfullscreen"></iframe>\n'
export const Speakerdeck: Story = {
  args: {
    block: sd,
  },
}
