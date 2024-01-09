import type { Meta, StoryObj } from '@storybook/react'
import type { BreadcrumbBlockObjectResponse } from 'notionate-pages'
import BreadcrumbBlock from './BreadcrumbBlock'
import '../../../styles/base.css'
import '../../../styles/page.css'

/* File
still a not supported component: file {
  object: 'block',
  id: '8b386055-5a2d-4339-812e-5d959f83f07d',
  parent: { type: 'page_id', page_id: '23740912-d6ac-4018-ab76-c64e772a342a' },
  created_time: '2024-01-07T02:00:00.000Z',
  last_edited_time: '2024-01-07T02:00:00.000Z',
  created_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  last_edited_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  has_children: false,
  archived: false,
  type: 'file',
  file: {
    caption: [],
    type: 'file',
    file: {
      url: 'https://prod-files-secure.s3.us-west-2.amazonaws.com/9c5c8bd8-2326-4257-98e7-557d511c9d37/2c85f471-2d8c-4979-8b38-8a37fca0dd2b/sample.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240108T130424Z&X-Amz-Expires=3600&X-Amz-Signature=c080de70c7fc07ba8683c97fa54f04dd143e0024d307327a497810ca6c07b2f9&X-Amz-SignedHeaders=host&x-id=GetObject',
      expiry_time: '2024-01-08T14:04:24.851Z'
    },
    name: 'sample.pdf'
  }
}
*/

/* Synced Block
still a not supported component: synced_block {
  object: 'block',
  id: '59c258ad-832b-40ae-b823-86c6ba589121',
  parent: { type: 'page_id', page_id: '23740912-d6ac-4018-ab76-c64e772a342a' },
  created_time: '2024-01-07T01:40:00.000Z',
  last_edited_time: '2024-01-07T01:40:00.000Z',
  created_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  last_edited_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  has_children: true,
  archived: false,
  type: 'synced_block',
  synced_block: { synced_from: null }
}
still a not supported component: synced_block {
  object: 'block',
  id: '78d88e3e-188a-41e3-86c4-2a576f6ed8bd',
  parent: { type: 'page_id', page_id: '23740912-d6ac-4018-ab76-c64e772a342a' },
  created_time: '2024-01-07T01:40:00.000Z',
  last_edited_time: '2024-01-07T01:40:00.000Z',
  created_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  last_edited_by: { object: 'user', id: 'c1400938-a445-438b-be9c-2734e5dc90a6' },
  has_children: true,
  archived: false,
  type: 'synced_block',
  synced_block: {
    synced_from: {
      type: 'block_id',
      block_id: '59c258ad-832b-40ae-b823-86c6ba589121'
    }
  }
}
*/

const block: BreadcrumbBlockObjectResponse = {
  object: 'block',
  id: '',
  parent: {
    type: 'page_id',
    page_id: ''
  },
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
  type: 'breadcrumb',
  breadcrumb: {},
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
