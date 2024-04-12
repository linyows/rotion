import type { Meta, StoryObj } from '@storybook/react'
import type { BreadcrumbBlockObjectResponseEx } from '../../../../exporter'
import BreadcrumbBlock from './BreadcrumbBlock'

const block: BreadcrumbBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab'
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
  type: 'breadcrumb',
  breadcrumb: {},
  list: [
    {
      id: '12345678-1234-1234-1234-1234567890ab',
      name: 'Foo Bar',
      icon: {
        type: 'external',
        src: 'https://www.notion.so/icons/rocket_blue.svg?mode=light',
        url: 'https://www.notion.so/icons/rocket_blue.svg?mode=light',
      },
    },
    {
      id: '12345678-1234-1234-1234-1234567890ab',
      name: 'Alice',
      icon: {
        type: 'external',
        src: 'https://www.notion.so/icons/library_blue.svg?mode=light',
        url: 'https://www.notion.so/icons/library_blue.svg?mode=light',
      },
    }
  ],
}

const meta = {
  title: 'Page/BreadcrumbBlock',
  component: BreadcrumbBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BreadcrumbBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const emoji = structuredClone(block)
emoji.list = [
  {
    id: '12345678-1234-1234-1234-1234567890ab',
    name: 'Foo Bar',
    icon: {
      type: 'emoji',
      emoji: '🚀',
    },
  },
  {
    id: '12345678-1234-1234-1234-1234567890ab',
    name: 'Alice',
    icon: {
      type: 'emoji',
      emoji: '🏛️',
    },
  }
]
export const Emoji: Story = {
  args: {
    block: emoji,
  }
}
