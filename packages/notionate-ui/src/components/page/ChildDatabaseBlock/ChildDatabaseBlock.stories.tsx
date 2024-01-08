import type { Meta, StoryObj } from '@storybook/react'
import type { ChildDatabaseBlockObjectResponseEx, GetDatabaseResponseEx, RichTextItemResponse } from 'notionate-pages'
import ChildDatabaseBlock from './ChildDatabaseBlock'
import '../../../styles/base.css'
import '../../../styles/page.css'

const title: RichTextItemResponse[] = [{
  type: 'text',
  text: {
    content: 'My Database',
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
  plain_text: 'My Database',
  href: null,
}]

const description: RichTextItemResponse[] = [{
  type: 'text',
  text: {
    content: "My Database's Description",
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
  plain_text: "My Database's Description",
  href: null,
}]

const database: GetDatabaseResponseEx = {
  object: 'database',
  id: '',
  title,
  description,
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
    },
  },
  icon: {
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
      title: {},
      name: 'title',
    },
  },
  url: '',
  public_url: '',
}

const block: ChildDatabaseBlockObjectResponseEx = {
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
  type: 'child_database',
  child_database: {
    title: 'My Database',
  },
  database,
}

const meta = {
  title: 'Notionate/ChildDatabaseBlock',
  component: ChildDatabaseBlock,
  args: {
    block,
    href: '/child-database',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChildDatabaseBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Emoji: Story = {}

const icon = structuredClone(block)
icon.database.icon! = {
  src: 'https://www.notion.so/icons/library_blue.svg?mode=light',
  type: 'external',
  external: {
    url: 'https://www.notion.so/icons/library_blue.svg?mode=light',
  }
}
export const Icon: Story = {
  args: {
    block: icon
  }
}
