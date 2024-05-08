import type { Meta, StoryObj } from '@storybook/react'
import type {
  ToDoBlockObjectResponse,
} from '../../../../exporter'
import ToDoBlock from './ToDoBlock'

/* TODO BLOCK */
const block: ToDoBlockObjectResponse = {
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
  type: 'to_do',
  to_do: {
    rich_text: [{
      type: 'text',
      text: {
        content: 'Check email for work',
        link: null,
      },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default'
      },
      plain_text: 'Check email for work',
      href: null,
    }],
    color: 'default',
    checked: true,
  },
  in_trash: false,
}

const meta = {
  title: 'Page/ToDoBlock',
  component: ToDoBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToDoBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {}

const unchecked = structuredClone(block)
unchecked.to_do.checked = false
export const UnChecked: Story = {
  args: {
    block: unchecked
  }
}
