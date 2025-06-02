import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TableBlockObjectResponseEx, RichTextItemResponse } from '../../../../exporter'
import TableBlock from './TableBlock'

/* RICH TEXT */
const richText: RichTextItemResponse = {
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
}

/* TABLE BLOCK */
const block: TableBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  created_time: '2020-02-22T22:22:22.000Z',
  last_edited_time: '2020-02-22T22:22:22.000Z',
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
  type: 'table',
  table: {
    table_width: 3,
    has_column_header: true,
    has_row_header: true,
  },
  children: {
    object: 'list',
    type: 'block',
    block: {},
    next_cursor: null,
    has_more: false,
    results: [
      {
        object: 'block',
        id: '12345678-1234-1234-1234-1234567890ab',
        parent: {
          type: 'block_id',
          block_id: '12345678-1234-1234-1234-1234567890ab',
        },
        created_time: '2020-02-22T22:22:22.000Z',
        last_edited_time: '2020-02-22T22:22:22.000Z',
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
        type: 'table_row',
        table_row: {
          cells: ['Header1', 'Header2', 'Header3'].map(v => {
            const r = structuredClone(richText)
            r.text.content = v
            r.plain_text = v
            return [r]
          }),
        },
        in_trash: false,
      },
      {
        object: 'block',
        id: '12345678-1234-1234-1234-1234567890ab',
        parent: {
          type: 'block_id',
          block_id: '12345678-1234-1234-1234-1234567890ab',
        },
        created_time: '2020-02-22T22:22:22.000Z',
        last_edited_time: '2020-02-22T22:22:22.000Z',
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
        type: 'table_row',
        table_row: {
          cells: ['Line1-1', 'Line1-2', 'Line1-3'].map(v => {
            const r = structuredClone(richText)
            r.text.content = v
            r.plain_text = v
            if (v === 'Line1-1') {
              const r2 = structuredClone(richText)
              r2.text.content = ' *required'
              r2.plain_text = ' *required'
              r2.annotations.color = 'red'
              return [r, r2]
            }
            if (v === 'Line1-3') {
              r.plain_text = v + v + v + v + ' '
              const r2 = structuredClone(richText)
              r2.plain_text = v + v + v + v + ' '
              r2.annotations.color = 'blue_background'
              return [r, r2, r]
            }
            return [r]
          }),
        },
        in_trash: false,
      },
      {
        object: 'block',
        id: '12345678-1234-1234-1234-1234567890ab',
        parent: {
          type: 'block_id',
          block_id: '12345678-1234-1234-1234-1234567890ab',
        },
        created_time: '2020-02-22T22:22:22.000Z',
        last_edited_time: '2020-02-22T22:22:22.000Z',
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
        type: 'table_row',
        table_row: {
          cells: ['Line2-1', 'Line2-2', 'Header2-3'].map(v => {
            const r = structuredClone(richText)
            r.text.content = v
            r.plain_text = v
            if (v === 'Line2-2') {
              r.plain_text = v + v + v + v
            }
            return [r]
          }),
        },
        in_trash: false,
      },
    ],
  },
  in_trash: false,
}

const meta = {
  title: 'Page/TableBlock',
  component: TableBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TableBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
