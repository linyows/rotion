import type { MentionRichTextItemResponseEx } from '../../../../exporter'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Mention from './Mention'
import { cdate } from 'cdate'

const textObject: MentionRichTextItemResponseEx = {
  type: 'mention',
  mention: {
    type: 'user',
    user: {
      id: '12345678-1234-1234-1234-1234567890ab',
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
  plain_text: '@Anonymous',
  href: null,
}

const meta = {
  title: 'RichText/Mention',
  component: Mention,
  args: {
    textObject,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Mention>

export default meta
type Story = StoryObj<typeof meta>

/* ANONYMOUS MENTION */
const anonymousMention = structuredClone(textObject) as MentionRichTextItemResponseEx
export const AnnonymousMention: Story = {
  args: {
    textObject: anonymousMention,
  }
}

/* USER MENTION */
const userMention = structuredClone(textObject) as MentionRichTextItemResponseEx
// @ts-ignore
userMention.mention.user = {
  id: '12345678-1234-1234-1234-1234567890ab',
  object: 'user',
  type: 'person',
  person: { email: 'alice@example.com' },
  name: 'Alice Cocéa',
  avatar_url: null,
}
export const UserMention: Story = {
  args: {
    textObject: userMention,
  }
}

/* GITHUB PREVIEW MENTION */
const github = 'https://github.com/linyows/rotion'
const githubPreviewMention = structuredClone(textObject)
githubPreviewMention.mention = {
  type: 'link_preview',
  link_preview: { url: github },
}
githubPreviewMention.plain_text = github
githubPreviewMention.href = github
export const GithubLinkPreviewMention: Story = {
  args: {
    textObject: githubPreviewMention,
  }
}

/* SLACK PREVIEW MENTION */
const slack = 'https://linyows.slack.com/archives/C02FCHEQH/p1658643567381379'
const slackPreviewMention = structuredClone(textObject)
slackPreviewMention.mention = {
  type: 'link_preview',
  link_preview: { url: slack },
}
slackPreviewMention.plain_text = slack
slackPreviewMention.href = slack
export const SlackLinkPreviewMention: Story = {
  args: {
    textObject: slackPreviewMention,
  }
}

/* FIGMA PREVIEW MENTION */
const figma = 'https://www.figma.com/file/GfHZFRpWGd0QXsRg9igdw8/Google-Material-Design?node-id=0%3A1'
const figmaPreviewMention = structuredClone(textObject)
figmaPreviewMention.mention = {
  type: 'link_preview',
  link_preview: { url: figma },
}
figmaPreviewMention.plain_text = figma
figmaPreviewMention.href = figma
export const FigmaLinkPreviewMention: Story = {
  args: {
    textObject: figmaPreviewMention,
  }
}

/* TEMPLATE MENTION
const templateMention = structuredClone(textObject)
templateMention.mention = {
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
*/

/* START DATE MENTION */
const startDateMention = structuredClone(textObject)
startDateMention.mention = {
  type: 'date',
  date: {
    start: '2024-01-01T00:00:00.000+09:00',
    end: null,
    time_zone: null,
  },
}
export const StartDateMention: Story = {
  args: {
    textObject: startDateMention,
  }
}

/* PERIOD DATE MENTION */
const periodDateMention = structuredClone(textObject)
periodDateMention.mention = {
  type: 'date',
  date: {
    start: '2023-12-01T12:00:00.000+09:00',
    end: '2024-02-01T10:00:00.000+09:00',
    time_zone: null,
  },
}
export const PeriodDateMention: Story = {
  args: {
    textObject: periodDateMention,
  }
}

/* YESTERDAY MENTION */
const yesterday = cdate().add(-1, 'day').format('YYYY-MM-DDT00:00:00.000+09:00')
const yesterdayMention = structuredClone(textObject)
yesterdayMention.mention = {
  type: 'date',
  date: {
    start: yesterday.toString(),
    end: null,
    time_zone: null,
  },
}
export const YesterdayMention: Story = {
  args: {
    textObject: yesterdayMention,
  }
}

/* PAGE MENTION */
const pageMention = structuredClone(textObject)
pageMention.mention = {
  type: 'page',
  page: {
    id: '12345678-1234-1234-1234-1234-1234567890ab',
    name: 'Child Page',
    icon: { type: 'emoji', emoji: '✌️' }
  },
}
export const PageMention: Story = {
  args: {
    textObject: pageMention,
  }
}

/* DATABSE MENTION */
const databaseMention = structuredClone(textObject)
databaseMention.mention = {
  type: 'database',
  database: {
    id: '12345678-1234-1234-1234-1234-1234567890ab',
    name: 'Child Database',
    icon: {
      type: 'external',
      src: 'https://www.notion.so/icons/light-bulb_blue.svg',
      url: 'https://www.notion.so/icons/light-bulb_blue.svg',
    },
  },
}
export const DatabaseMention: Story = {
  args: {
    textObject: databaseMention,
  }
}
