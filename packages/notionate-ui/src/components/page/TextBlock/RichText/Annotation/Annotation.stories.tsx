import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { RichTextItemResponse, TextRichTextItemResponse } from 'notionate-pages'
import Annotation from './Annotation'
import '../../../../../styles/base.css'
import '../../../../../styles/page.css'

const textObject = {
  type: 'text',
  text: {
    content: 'hello',
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
  plain_text: 'hello',
  href: null,
} as RichTextItemResponse

const meta = {
  title: 'RichText/Annotation',
  component: Annotation,
  args: {
    textObject,
    children: <>Text Style</>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Annotation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const bold = structuredClone(textObject)
bold.annotations.bold = true
export const Bold: Story = {
  args: {
    textObject: bold,
  }
}

const italic = structuredClone(textObject)
italic.annotations.italic = true
export const Italic: Story = {
  args: {
    textObject: italic,
  }
}

const strikethrough = structuredClone(textObject)
strikethrough.annotations.strikethrough = true
export const Strikethrough: Story = {
  args: {
    textObject: strikethrough,
  }
}

const underline = structuredClone(textObject)
underline.annotations.underline = true
export const Underline: Story = {
  args: {
    textObject: underline,
  }
}

const code = structuredClone(textObject)
code.annotations.code = true
export const Code: Story = {
  args: {
    textObject: code,
  }
}

const blue = structuredClone(textObject)
blue.annotations.color = 'blue'
export const Blue: Story = {
  args: {
    textObject: blue,
  }
}

const linked = structuredClone(textObject) as TextRichTextItemResponse
linked.text.link = { url: 'https://github.com' }
linked.href = 'https://github.com'
export const Linked: Story = {
  args: {
    textObject: linked,
    children: <>GitHub</>,
  }
}
