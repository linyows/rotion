import React from 'react'
import type { TextRichTextItemResponse } from '../../../../exporter'
import type { Meta, StoryObj } from '@storybook/react'
import LinkIfLinked from './LinkIfLinked'

const textObject = {
  type: 'text',
  text: {
    content: 'hello world',
    link: {
      url: 'https://github.com',
    },
  },
  annotations: {
    bold: true,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default',
  },
  plain_text: 'hello world',
  href: 'https://github.com',
} as TextRichTextItemResponse

const meta = {
  title: 'RichText/LinkIfLinked',
  component: LinkIfLinked,
  args: {
    condition: true,
    textObject,
    children: <>Hi</>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkIfLinked>

export default meta
type Story = StoryObj<typeof meta>

export const Linked: Story = {}

const noLinked = structuredClone(textObject)
noLinked.text.link = null
noLinked.href = null
export const NoLinked: Story = {
  args: {
    condition: false,
    textObject: noLinked,
  }
}
