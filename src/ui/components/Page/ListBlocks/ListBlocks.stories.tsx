import type { Meta, StoryObj } from '@storybook/react'
import type {
  BlockObjectResponse,
  TextRichTextItemResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from '../../../../exporter'
import ListBlocks from './ListBlocks'

const baseBlock = {
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
  type: '',
}

/* RICH TEXT */
const richText1 = {
  type: 'text',
  text: { content: 'Milk', link: null },
  annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' },
  plain_text: 'Milk',
  href: null,
} as TextRichTextItemResponse
const richText2 = structuredClone(richText1)
richText2.text.content = 'Coffee'
richText2.plain_text = 'Coffee'
const richText3 = structuredClone(richText1)
richText3.text.content = 'Suger'
richText3.plain_text = 'Suger'

/* BULLETED LIST */
const bulletedListItem1 = structuredClone(baseBlock) as unknown as BulletedListItemBlockObjectResponse
bulletedListItem1.type = 'bulleted_list_item'
bulletedListItem1.bulleted_list_item = { rich_text: [richText1], color: 'default' }
const bulletedListItem2 = structuredClone(bulletedListItem1)
bulletedListItem2.bulleted_list_item.rich_text = [richText2]
const bulletedListItem3 = structuredClone(bulletedListItem1)
bulletedListItem2.bulleted_list_item.rich_text = [richText3]
const ulBlocks: BlockObjectResponse[] = [
  bulletedListItem1,
  bulletedListItem2,
  bulletedListItem3,
]

/* NUMBERED LIST */
const numberedListItem1 = structuredClone(baseBlock) as unknown as NumberedListItemBlockObjectResponse
numberedListItem1.type = 'numbered_list_item'
numberedListItem1.numbered_list_item = { rich_text: [richText1], color: 'default' }
const numberedListItem2 = structuredClone(numberedListItem1)
numberedListItem2.numbered_list_item.rich_text = [richText2]
const numberedListItem3 = structuredClone(numberedListItem1)
numberedListItem2.numbered_list_item.rich_text = [richText3]
const olBlocks: BlockObjectResponse[] = [
  numberedListItem1,
  numberedListItem2,
  numberedListItem3,
]

const meta = {
  title: 'Page/ListBlocks',
  component: ListBlocks,
  args: {
    blocks: ulBlocks,
    tag: 'ul',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListBlocks>

export default meta
type Story = StoryObj<typeof meta>

export const Unordered: Story = {}

export const Ordered: Story = {
  args: {
    blocks: olBlocks,
    tag: 'ol',
  }
}
