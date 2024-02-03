import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnListBlockObjectResponseEx } from '../../../../exporter'
import ColumnListBlock from './ColumnListBlock'

const block: ColumnListBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  type: 'column_list',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  column_list: {},
  children: {
    object: 'list',
    results: [
      {
        object: 'block',
        id: '12345678-1234-1234-1234-1234567890ab',
        parent: {
          type: 'page_id',
          page_id: '12345678-1234-1234-1234-1234567890ab',
        },
        created_time: '',
        last_edited_time: '',
        created_by: {
          object: 'user',
          id: ''
        },
        last_edited_by: {
          object: 'user',
          id: ''
        },
        archived: false,
        has_children: true,
        type: 'column',
        column: {},
      },
      {
        object: 'block',
        id: '12345678-1234-1234-1234-1234567890ab',
        parent: {
          type: 'page_id',
          page_id: '12345678-1234-1234-1234-1234567890ab',
        },
        created_time: '',
        last_edited_time: '',
        created_by: {
          object: 'user',
          id: ''
        },
        last_edited_by: {
          object: 'user',
          id: ''
        },
        archived: false,
        has_children: true,
        type: 'column',
        column: {},
      },
      {
        object: 'block',
        id: '12345678-1234-1234-1234-1234567890ab',
        parent: {
          type: 'page_id',
          page_id: '12345678-1234-1234-1234-1234567890ab',
        },
        created_time: '',
        last_edited_time: '',
        created_by: {
          object: 'user',
          id: ''
        },
        last_edited_by: {
          object: 'user',
          id: ''
        },
        archived: false,
        has_children: true,
        type: 'column',
        column: {},
      },
    ],
    next_cursor: null,
    has_more: false,
    type: 'block',
    block: {},
    last_edited_time: '2024-01-07T01:52:00.000Z',
  },
  columns: [
    {
      object: 'list',
      results: [
        {
          object: 'block',
          id: '',
          parent: {
            type: 'block_id',
            block_id: '',
          },
          created_time: '',
          last_edited_time: '',
          created_by: {
            object: 'user',
            id: ''
          },
          last_edited_by: {
            object: 'user',
            id: ''
          },
          has_children: false,
          archived: false,
          type: 'heading_1',
          heading_1: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Bali',
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
              plain_text: 'Bali',
              href: null,
            }],
            is_toggleable: false,
            color: 'default',
          },
        },
        {
          object: 'block',
          id: '',
          parent: {
            type: 'block_id',
            block_id: '',
          },
          created_time: '',
          last_edited_time: '',
          created_by: {
            object: 'user',
            id: ''
          },
          last_edited_by: {
            object: 'user',
            id: ''
          },
          has_children: false,
          archived: false,
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Bali is predominantly a Hindu country. Bali is known for its elaborate, traditional dancing. The dancing is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil. To watch the dancing is a breathtaking experience. Lombok has some impressive points of interest.',
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
              plain_text: 'Bali is predominantly a Hindu country. Bali is known for its elaborate, traditional dancing. The dancing is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil. To watch the dancing is a breathtaking experience. Lombok has some impressive points of interest.',
              href: null,
            }],
            color: 'default',
          },
        },
      ],
      next_cursor: null,
      has_more: false,
      type: 'block',
      block: {},
      last_edited_time: '2024-01-07T01:48:00.000Z',
    },
    {
      object: 'list',
      results: [
        {
          object: 'block',
          id: '',
          parent: {
            type: 'block_id',
            block_id: '',
          },
          created_time: '',
          last_edited_time: '',
          created_by: {
            object: 'user',
            id: ''
          },
          last_edited_by: {
            object: 'user',
            id: ''
          },
          has_children: false,
          archived: false,
          type: 'heading_1',
          heading_1: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Racial Equality',
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
              plain_text: 'Racial Equality',
              href: null,
            }],
            is_toggleable: false,
            color: 'default',
          },
        },
        {
          object: 'block',
          id: '',
          parent: {
            type: 'block_id',
            block_id: '',
          },
          created_time: '',
          last_edited_time: '',
          created_by: {
            object: 'user',
            id: ''
          },
          last_edited_by: {
            object: 'user',
            id: ''
          },
          has_children: false,
          archived: false,
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Martin Luther King Jr. led many demonstrations against racism. He delivered his message in a non-violent manner. Some members of his movement later engaged in less peaceful protests. Luther King was detained several times. The longest jail sentence he received was four months.',
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
              plain_text: 'Martin Luther King Jr. led many demonstrations against racism. He delivered his message in a non-violent manner. Some members of his movement later engaged in less peaceful protests. Luther King was detained several times. The longest jail sentence he received was four months.',
              href: null,
            }],
            color: 'default',
          },
        },
      ],
      next_cursor: null,
      has_more: false,
      type: 'block',
      block: {},
      last_edited_time: '2024-01-07T01:48:00.000Z',
    },
    {
      object: 'list',
      results: [
        {
          object: 'block',
          id: '',
          parent: {
            type: 'block_id',
            block_id: '',
          },
          created_time: '',
          last_edited_time: '',
          created_by: {
            object: 'user',
            id: ''
          },
          last_edited_by: {
            object: 'user',
            id: ''
          },
          has_children: false,
          archived: false,
          type: 'heading_1',
          heading_1: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Possible Solution',
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
              plain_text: 'Possible Solution',
              href: null,
            }],
            is_toggleable: false,
            color: 'default',
          },
        },
        {
          object: 'block',
          id: '',
          parent: {
            type: 'block_id',
            block_id: '',
          },
          created_time: '',
          last_edited_time: '',
          created_by: {
            object: 'user',
            id: ''
          },
          last_edited_by: {
            object: 'user',
            id: ''
          },
          has_children: false,
          archived: false,
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: 'Nelson Mandela and Martin Luther King Jr. both fought for racial equality. Although Luther King was an American citizen and Mandela a native South African, their dreams were the same. The intolerance of white people towards black co-inhabitants was the catalyst for years of activism.',
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
              plain_text: 'Nelson Mandela and Martin Luther King Jr. both fought for racial equality. Although Luther King was an American citizen and Mandela a native South African, their dreams were the same. The intolerance of white people towards black co-inhabitants was the catalyst for years of activism.',
              href: null,
            }],
            color: 'default',
          },
        },
      ],
      next_cursor: null,
      has_more: false,
      type: 'block',
      block: {},
      last_edited_time: '2024-01-07T01:48:00.000Z',
    },
  ],
  created_time: '2024-01-07T01:52:00.000Z',
  last_edited_time: '2024-01-07T01:52:00.000Z',
  created_by: {
    object: 'user',
    id: ''
  },
  last_edited_by: {
    object: 'user',
    id: ''
  },
  has_children: false,
  archived: false,
}

const meta = {
  title: 'Page/ColumnListBlock',
  component: ColumnListBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColumnListBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
