import type { Meta, StoryObj } from '@storybook/react-vite'
import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponseEx,
  NumberedListItemBlockObjectResponseEx,
  TextRichTextItemResponse,
} from '../../../../exporter/index.js'
import ListBlocks from './ListBlocks.js'

const list1 = ['Coffee', 'Milk', 'Cinnamon']
const list2 = ['Light', 'Medium', 'Dark']
const list3 = ['Paper filter', 'Espresso']

const baseBlock: unknown = {
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
  type: '',
  children: {
    object: 'list',
    results: [],
  },
}

/* RICH TEXT */
const richText1: TextRichTextItemResponse = {
  type: 'text',
  text: {
    content: '',
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
  plain_text: '',
  href: null,
}

function makeBulletedList(v: string) {
  const bulletedListItem1 = structuredClone(baseBlock) as BulletedListItemBlockObjectResponseEx
  bulletedListItem1.type = 'bulleted_list_item'
  const bulleted = structuredClone(bulletedListItem1)
  const r = structuredClone(richText1)
  r.text.content = v
  r.plain_text = v
  bulleted.bulleted_list_item = {
    rich_text: [r],
    color: 'default',
  }
  return bulleted
}

function makeNumberedList(v: string) {
  const numberedListItem1 = structuredClone(baseBlock) as NumberedListItemBlockObjectResponseEx
  numberedListItem1.type = 'numbered_list_item'
  const numbered = structuredClone(numberedListItem1)
  const r = structuredClone(richText1)
  r.text.content = v
  r.plain_text = v
  numbered.numbered_list_item = {
    rich_text: [r],
    color: 'default',
  }
  return numbered
}

/* BULLETED LIST */
const bulletedBlocks: BlockObjectResponse[] = list1.map((v) => {
  const bulleted = makeBulletedList(v)
  bulleted.has_children = true
  bulleted.children = {
    object: 'list',
    results: list2.map((vv) => {
      const bulleted = makeBulletedList(vv)
      bulleted.has_children = true
      bulleted.children = {
        object: 'list',
        results: list3.map((vvv) => makeBulletedList(vvv)),
        type: 'block',
        next_cursor: null,
        has_more: false,
        block: {},
      }
      return bulleted
    }),
    type: 'block',
    next_cursor: null,
    has_more: false,
    block: {},
  }
  return bulleted
})

/* NUMBERED LIST */
const numberedBlocks: BlockObjectResponse[] = list1.map((v) => {
  const numbered = makeNumberedList(v)
  numbered.has_children = true
  numbered.children = {
    object: 'list',
    results: list2.map((vv) => {
      const numbered = makeNumberedList(vv)
      numbered.has_children = true
      numbered.children = {
        object: 'list',
        results: list3.map((vvv) => makeNumberedList(vvv)),
        type: 'block',
        next_cursor: null,
        has_more: false,
        block: {},
      }
      return numbered
    }),
    type: 'block',
    next_cursor: null,
    has_more: false,
    block: {},
  }
  return numbered
})

const meta = {
  title: 'Page/ListBlocks',
  component: ListBlocks,
  args: {
    blocks: bulletedBlocks,
    tag: 'ul',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListBlocks>

export default meta
type Story = StoryObj<typeof meta>

export const Bulleted: Story = {}

export const Numbered: Story = {
  args: {
    blocks: numberedBlocks,
    tag: 'ol',
  },
}
