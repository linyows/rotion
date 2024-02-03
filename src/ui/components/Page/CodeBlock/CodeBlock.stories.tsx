import type { Meta, StoryObj } from '@storybook/react'
import type { CodeBlockObjectResponse } from '../../../../exporter'
import CodeBlock from './CodeBlock'

const block: CodeBlockObjectResponse = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  type: 'code',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  code: {
    rich_text: [{
      type: 'text',
      text: {
        content: 'type Text = {\n  href: string\n  anotaion: {\n    color: string\n    bold: boolean\n  }\n}',
        link: null,
      },
      annotations: {
        bold: true,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default',
      },
      plain_text: 'type Text = {\n  href: string\n  anotaion: {\n    color: string\n    bold: boolean\n  }\n}',
      href: null,
    }],
    caption: [],
    language: 'typescript',
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
}

const meta = {
  title: 'Page/CodeBlock',
  component: CodeBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
