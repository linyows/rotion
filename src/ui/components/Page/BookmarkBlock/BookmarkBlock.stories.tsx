import type { Meta, StoryObj } from '@storybook/react'
import type { BookmarkBlockObjectResponseEx } from '../../../../exporter'
import BookmarkBlock from './BookmarkBlock'
import './BookmarkBlock.css'

const block: BookmarkBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  type: 'bookmark',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  bookmark: {
    url: 'https://github.com',
    caption: [
      {
        type: 'text',
        text: {
          content: 'GitHub is very cool website.',
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
        plain_text: 'GitHub is very cool website.',
        href: null,
      },
    ],
    site: {
      title: 'GitHub: Let’s build from here',
      desc: 'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...',
      image: 'https://github.githubassets.com/assets/campaign-social-031d6161fa10.png',
      icon: 'https://github.com/fluidicon.png',
    }
  },
  created_time: '2024-01-07T01:52:00.000Z',
  last_edited_time: '2024-01-07T01:52:00.000Z',
  created_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab'
  },
  last_edited_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab'
  },
  has_children: false,
  archived: false,
}

const meta = {
  title: 'Page/BookmarkBlock',
  component: BookmarkBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookmarkBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const emptyBookmark = structuredClone(block)
emptyBookmark.bookmark.site.title = ''
emptyBookmark.bookmark.site.desc = ''
emptyBookmark.bookmark.site.image = ''
export const Empty: Story = {
  args: {
    block: emptyBookmark,
  },
}
