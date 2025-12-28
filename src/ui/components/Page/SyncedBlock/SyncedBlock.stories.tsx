import type { Meta, StoryObj } from '@storybook/react-vite'
import type {
  SyncedBlockBlockObjectResponseEx,
  ParagraphBlockObjectResponseEx,
  RichTextItemResponse,
  ListBlockChildrenResponseEx,
} from '../../../../exporter/index.js'
import SyncedBlock from './SyncedBlock.js'

const richText: RichTextItemResponse = {
  type: 'text',
  text: {
    content: 'Similar to the Notion UI, there are two versions of a synced_block object: the original block that was created first and doesn\'t yet sync with anything else, and the duplicate block or blocks synced to the original.',
    link: null,
  },
  annotations: {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default'
  },
  plain_text: 'Similar to the Notion UI, there are two versions of a synced_block object: the original block that was created first and doesn\'t yet sync with anything else, and the duplicate block or blocks synced to the original.',
  href: null,
}

/* PARAGRAPH BLOCK */
const p: ParagraphBlockObjectResponseEx = {
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
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  type: 'paragraph',
  paragraph: {
    rich_text: [richText],
    color: 'default',
  },
  in_trash: false,
}

/* SYNCED BLOCK BLOCK */
const block: SyncedBlockBlockObjectResponseEx = {
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
  type: 'synced_block',
  synced_block: {
    synced_from: {
      type: 'block_id',
      block_id: '12345678-1234-1234-1234-1234567890ab',
    },
  },
  children: {
    results: [p]
  } as ListBlockChildrenResponseEx,
  in_trash: false,
}

const meta = {
  title: 'Page/SyncedBlock',
  component: SyncedBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SyncedBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
