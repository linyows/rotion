import type { Meta, StoryObj } from '@storybook/react'
import type { LinkPreviewBlockObjectResponse } from '../../../../exporter'
import LinkPreviewBlock from './LinkPreviewBlock'

const block: LinkPreviewBlockObjectResponse = {
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
  type: 'link_preview',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  link_preview: {
    url: 'https://github.com/linyows/rotion/pull/3',
  },
}

const meta = {
  title: 'Page/LinkPreviewBlock',
  component: LinkPreviewBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkPreviewBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Github: Story = {}

const slack = structuredClone(block)
slack.link_preview.url = 'https://linyows.slack.com/archives/C02FCHEQH/p1658643567381379'
export const Slack: Story = {
  args: {
    block: slack,
  },
}

const figma = structuredClone(block)
figma.link_preview.url = 'https://www.figma.com/file/GfHZFRpWGd0QXsRg9igdw8/Google-Material-Design?node-id=0%3A1'
export const Figma: Story = {
  args: {
    block: figma,
  },
}
