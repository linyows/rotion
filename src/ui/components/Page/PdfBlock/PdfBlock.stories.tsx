import type { Meta, StoryObj } from '@storybook/react-vite'
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
    type: 'file',
    file: {
      url: 'https://prod-files-secure.s3.us-west-2.amazonaws.com/9c5c8bd8-2326-4257-98e7-557d511c9d37/3be2c579-093b-4e0c-ad32-f51e7160ccc1/sample.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&...',
      expiry_time: '2024-06-11T00:49:09.664Z',
    },
    caption: [
      {
        type: 'text',
        text: {
          content: 'This is a PDF file',
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
        plain_text: 'This is a PDF file',
        href: null,
      },
    ],
    src: '/files/block-a269e10b-843a-442c-a2bc-b3ac61350849-8151325dcdbae9e0ff95f9f9658432dbedfdb209.pdf',
    size: 3028,
  },
  in_trash: false,
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
