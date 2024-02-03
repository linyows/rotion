import type { Meta, StoryObj } from '@storybook/react'
import type { ImageBlockObjectResponseEx } from '../../../../exporter'
import ImageBlock from './ImageBlock'

const block: ImageBlockObjectResponseEx = {
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
  type: 'image',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  image: {
    type: 'file',
    file: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      expiry_time: '',
    },
    src: '/images/beach.jpg',
    caption: [
      {
        type: 'text',
        text: {
          content: 'Beautiful beach',
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
        plain_text: 'Beautiful beach',
        href: null,
      },
    ],
  },
}

const meta = {
  title: 'Page/ImageBlock',
  component: ImageBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
