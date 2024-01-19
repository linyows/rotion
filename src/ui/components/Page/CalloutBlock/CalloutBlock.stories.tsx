import type { Meta, StoryObj } from '@storybook/react'
import type { CalloutBlockObjectResponseEx, RichTextItemResponse } from '../../../../exporter'
import CalloutBlock from './CalloutBlock'
import '../../../styles/base.css'
import '../../../styles/page.css'

const richText: RichTextItemResponse = {
  type: 'text',
  text: {
    content: 'This is callout block',
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
  plain_text: 'This is callout block',
  href: null,
}

const block: CalloutBlockObjectResponseEx = {
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
  type: 'callout',
  callout: {
    rich_text: [richText],
    color: 'default',
    icon: {
      type: 'emoji',
      emoji: '💡',
    }
  },
}

const meta = {
  title: 'Page/CalloutBlock',
  component: CalloutBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalloutBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Emoji: Story = {}

const icon = structuredClone(block)
icon.callout.icon! = {
  type: 'external',
  external: {
    url: 'https://www.notion.so/icons/light-bulb_blue.svg?mode=light',
  },
  src: 'https://www.notion.so/icons/light-bulb_blue.svg?mode=light',
}
export const Icon: Story = {
  args: {
    block: icon
  }
}
