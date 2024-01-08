import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { ChildPageBlockObjectResponseEx, GetPageResponseEx, ListBlockChildrenResponseEx } from 'notionate-pages'
import ChildPageBlock from './ChildPageBlock'
import '../../../styles/base.css'
import '../../../styles/page.css'

const page: GetPageResponseEx = {
  object: 'page',
  id: '',
  created_time: '2022-08-11T13:02:00.000Z',
  last_edited_time: '2024-01-07T01:36:00.000Z',
  created_by: {
    object: 'user',
    id: 'c1400938-a445-438b-be9c-2734e5dc90a6',
  },
  last_edited_by: {
    object: 'user',
    id: 'c1400938-a445-438b-be9c-2734e5dc90a6',
  },
  cover: {
    src: '',
    type: 'external',
    external: {
      url: '',
      expiry_time: '',
    },
  },
  icon: {
    src: '',
    type: 'emoji',
    emoji: '🏛️',
  },
  parent: {
    type: 'page_id',
    page_id: '23740912-d6ac-4018-ab76-c64e772a342a',
  },
  archived: false,
  properties: {
    title: {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: 'Nested',
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
          plain_text: 'Nested',
          href: null,
        },
      ],
    },
  },
  url: '',
  public_url: '',
}

const children: ListBlockChildrenResponseEx = {
  object: 'list',
  results: [],
  next_cursor: null,
  has_more: false,
  type: 'block',
  block: {},
  last_edited_time: '2024-01-07T01:36:00.000Z',
}

const block: ChildPageBlockObjectResponseEx = {
  object: 'block',
  id: '',
  parent: {
    type: 'page_id',
    page_id: '',
  },
  created_time: '',
  last_edited_time: '',
  created_by: {
    object: 'user',
    id: '',
  },
  last_edited_by: {
    object: 'user',
    id: '',
  },
  has_children: false,
  archived: false,
  type: 'child_page',
  child_page: {
    title: 'My Page',
  },
  page,
  children,
}

const meta = {
  title: 'Notionate/ChildPageBlock',
  component: ChildPageBlock,
  args: {
    block,
    href: '/child-page',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChildPageBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Emoji: Story = {}

const icon = structuredClone(block)
icon.page.icon.type = 'external'
icon.page.icon.src = 'https://www.notion.so/icons/library_blue.svg?mode=light'
export const Icon: Story = {
  args: {
    block: icon
  }
}
