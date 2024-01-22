import React from 'react'
import type { MentionRichTextItemResponseEx } from '../../../../../../exporter'
import type { Meta, StoryObj } from '@storybook/react'
import Mention from './Mention'
import '../../../../../styles/base.css'
import '../../../../../styles/page.css'

const textObject: MentionRichTextItemResponseEx = {
  type: 'mention',
  mention: {
    type: 'user',
    user: {
      type: 'person',
      person: {
        email: 'alice@example.com',
      },
      name: 'alice',
      avatar_url: null,
      id: 'ididididid',
      object: 'user',
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
  plain_text: 'alice',
  href: null,
}

const meta = {
  title: 'RichText/Mention',
  component: Mention,
  args: {
    textObject,
    children: <>Hello</>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Mention>

export default meta
type Story = StoryObj<typeof meta>

const userMention: MentionRichTextItemResponseEx = {
  type: 'mention',
  mention: {
    type: 'user',
    user: {
      type: 'person',
      person: {
        email: 'alice@example.com',
      },
      name: 'alice',
      avatar_url: null,
      id: 'ididididid',
      object: 'user',
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
  plain_text: 'alice',
  href: null,
}
export const UserMention: Story = {
  args: {
    textObject: userMention,
  }
}

const linkPreviewMention = structuredClone(userMention)
linkPreviewMention.mention = {
  type: 'link_preview',
  link_preview: {
    url: 'https://github.com',
  },
}
export const LinkPreviewMention: Story = {
  args: {
    textObject: linkPreviewMention,
  }
}

const templateMention = structuredClone(userMention)
linkPreviewMention.mention = {
  type: 'template_mention',
  template_mention: {
    type: 'template_mention_user',
    template_mention_user: 'me',
  },
}
export const TemplateMention: Story = {
  args: {
    textObject: templateMention,
  }
}

const dateMention = structuredClone(userMention)
dateMention.mention = {
  type: 'date',
  date: {
    start: '20240101-000000',
    end: null,
    time_zone: null,
  },
}
export const DateMention: Story = {
  args: {
    textObject: dateMention,
  }
}

const pageMention = structuredClone(userMention)
pageMention.mention = {
  type: 'page',
  page: {
    id: 'abcdefg',
    name: 'Child Page',
    icon: { type: 'emoji', emoji: '✌️' }
  },
}
export const PageMention: Story = {
  args: {
    textObject: pageMention,
  }
}

const databaseMention = structuredClone(userMention)
databaseMention.mention = {
  type: 'database',
  database: {
    id: 'abcdefg',
    name: 'Child Database',
    icon: {
      type: 'external',
      src: 'https://www.notion.so/icons/light-bulb_blue.svg?mode=light',
      url: 'https://www.notion.so/icons/light-bulb_blue.svg?mode=light',
    }
  },
}
export const DatabaseMention: Story = {
  args: {
    textObject: databaseMention,
  }
}
