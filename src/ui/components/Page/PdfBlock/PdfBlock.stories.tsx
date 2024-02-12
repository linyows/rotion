import type { Meta, StoryObj } from '@storybook/react'
import type { PdfBlockObjectResponseEx } from '../../../../exporter'
import PdfBlock from './PdfBlock'

const block: PdfBlockObjectResponseEx = {
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
  type: 'pdf',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  pdf: {
    type: 'external',
    external: {
      url: 'https://www.africau.edu/images/default/sample.pdf',
    },
    caption: [],
    src: 'https://www.africau.edu/images/default/sample.pdf',
    size: 3028,
  },
}

const meta = {
  title: 'Page/PdfBlock',
  component: PdfBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PdfBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
