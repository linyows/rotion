import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FileBlockObjectResponseEx } from '../../../../exporter'
import FileBlock from './FileBlock'

const block: FileBlockObjectResponseEx = {
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
  type: 'file',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  file: {
    name: 'sample.pdf',
    type: 'external',
    external: {
      url: 'https://www.africau.edu/images/default/sample.pdf',
    },
    caption: [
      {
        type: 'text',
        text: {
          content: 'This is sample file',
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
        plain_text: 'This is sample file',
        href: null,
      },
    ],
    src: 'https://www.africau.edu/images/default/sample.pdf',
    size: 3028,
  },
  in_trash: false,
}

const meta = {
  title: 'Page/FileBlock',
  component: FileBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
