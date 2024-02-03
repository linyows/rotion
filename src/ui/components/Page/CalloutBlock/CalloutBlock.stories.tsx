import type { Meta, StoryObj } from '@storybook/react'
import type { CalloutBlockObjectResponseEx, RichTextItemResponse } from '../../../../exporter'
import CalloutBlock from './CalloutBlock'

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
