import type { Meta, StoryObj } from '@storybook/react'
import type { ChildPageBlockObjectResponseEx, GetPageResponseEx, ListBlockChildrenResponseEx } from '../../../../exporter'
import ChildPageBlock from './ChildPageBlock'
import './ChildPageBlock.css'

/* Next is Database
{
  object: 'block',
  id: '3441b8bf-f508-43a3-9bcc-697d4e9c03eb',
  parent: {
    type: 'block_id',
    block_id: '01879e59-f0bc-41d9-8db6-84fb5e2cb709'
  },
  created_time: '2022-09-09T23:16:00.000Z',
  last_edited_time: '2024-01-07T02:07:00.000Z',
  created_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  last_edited_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  has_children: true,
  archived: false,
  type: 'child_page',
  child_page: { title: 'Gallery' },
  page: {
    object: 'page',
    id: '3441b8bf-f508-43a3-9bcc-697d4e9c03eb',
    created_time: '2022-09-09T23:16:00.000Z',
    last_edited_time: '2024-01-07T02:07:00.000Z',
    created_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
    last_edited_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
    cover: null,
    icon: {
      type: 'external',
      external: [Object],
      src: '/images/page-icon-3441b8bf-f508-43a3-9bcc-697d4e9c03eb-de225e3ef1de17e54ef153fdeeca2c0a72c34637.svg'
    },
    parent: {
      type: 'block_id',
      block_id: '01879e59-f0bc-41d9-8db6-84fb5e2cb709'
    },
    archived: false,
    properties: { title: [Object] },
    url: 'https://www.notion.so/Gallery-3441b8bff50843a39bcc697d4e9c03eb',
    public_url: 'https://linyows.notion.site/Gallery-3441b8bff50843a39bcc697d4e9c03eb',
    request_id: '6f0192fc-58d3-434d-9cf5-e52f23dd2564',
    meta: {
      object: 'list',
      results: [Array],
      next_cursor: null,
      has_more: false,
      type: 'property_item',
      property_item: [Object],
      request_id: '97193da4-8cf4-44fc-8a61-1252bd24f8a8'
    }
  },
  children: {
    object: 'list',
    results: [ [Object], [Object] ],
    next_cursor: null,
    has_more: false,
    type: 'block',
    block: {},
    request_id: '86923432-7309-4539-be8a-e276f88ccc6f',
    last_edited_time: '2024-01-07T02:07:00.000Z'
  }
}
*/

/* Next is Page
{
  object: 'block',
  id: '41af4a22-964d-4c6a-adef-7b6921d764bc',
  parent: {
    type: 'block_id',
    block_id: '15b0486c-5bff-4a37-8a11-23f3b3bcd468'
  },
  created_time: '2024-01-06T02:12:00.000Z',
  last_edited_time: '2024-01-07T14:22:00.000Z',
  created_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  last_edited_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  has_children: true,
  archived: false,
  type: 'child_page',
  child_page: { title: 'Rich Text' },
  page: {
    object: 'page',
    id: '41af4a22-964d-4c6a-adef-7b6921d764bc',
    created_time: '2024-01-06T02:12:00.000Z',
    last_edited_time: '2024-01-07T14:22:00.000Z',
    created_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
    last_edited_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
    cover: null,
    icon: {
      type: 'external',
      external: [Object],
      src: '/images/page-icon-41af4a22-964d-4c6a-adef-7b6921d764bc-108cdfdc63ef600faa71cbe417740544030db14d.svg'
    },
    parent: {
      type: 'block_id',
      block_id: '15b0486c-5bff-4a37-8a11-23f3b3bcd468'
    },
    archived: false,
    properties: { title: [Object] },
    url: 'https://www.notion.so/Rich-Text-41af4a22964d4c6aadef7b6921d764bc',
    public_url: 'https://linyows.notion.site/Rich-Text-41af4a22964d4c6aadef7b6921d764bc',
    request_id: 'adda0020-3c2c-45e6-9f6a-d8356eeac085',
    meta: {
      object: 'list',
      results: [Array],
      next_cursor: null,
      has_more: false,
      type: 'property_item',
      property_item: [Object],
      request_id: '8d11968d-608c-4dce-a864-f0222d6d730c'
    }
  },
  children: {
    object: 'list',
    results: [
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object]
    ],
    next_cursor: null,
    has_more: false,
    type: 'block',
    block: {},
    request_id: 'd89d8c2e-0528-47ec-b6ab-f1bedd6976c0',
    last_edited_time: '2024-01-07T14:22:00.000Z'
  }
}
*/

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
  title: 'Page/ChildPageBlock',
  component: ChildPageBlock,
  args: {
    block,
    href: '/path/to/[slug]',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChildPageBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Emoji: Story = {}

const icon = structuredClone(block)
icon.page.icon!.type = 'external'
icon.page.icon!.src = 'https://www.notion.so/icons/library_blue.svg?mode=light'
export const Icon: Story = {
  args: {
    block: icon
  }
}
