import type { Meta, StoryObj } from '@storybook/react-vite'
import type { BlockObjectResponse, ToggleBlockObjectResponseEx } from '../../../../exporter/index.js'
import ToggleBlock from './ToggleBlock.js'

/* PARAGRAPH BLOCK */
const p: BlockObjectResponse = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  parent: {
    type: 'block_id',
    block_id: '12345678-1234-1234-1234-1234567890ab',
  },
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
  type: 'paragraph',
  paragraph: {
    rich_text: [
      {
        type: 'text',
        text: {
          content: 'Hello',
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
        plain_text: 'Hello',
        href: null,
      },
    ],
    color: 'default',
  },
  in_trash: false,
}

/* TOGGLE BLOCK */
const block: ToggleBlockObjectResponseEx = {
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
  has_children: true,
  archived: false,
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  type: 'toggle',
  toggle: {
    rich_text: [
      {
        type: 'text',
        text: {
          content: 'Write test code',
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
        plain_text: 'Write test code',
        href: null,
      },
    ],
    color: 'default',
  },
  children: {
    type: 'block',
    block: {},
    object: 'list',
    next_cursor: null,
    has_more: false,
    results: [p],
    children: undefined,
    last_edited_time: undefined,
  },
  in_trash: false,
}

const meta = {
  title: 'Page/ToggleBlock',
  component: ToggleBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
