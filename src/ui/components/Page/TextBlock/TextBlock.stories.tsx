import type { Meta, StoryObj } from '@storybook/react'
import type {
    DividerBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponseEx,
  QuoteBlockObjectResponse,
  RichTextItemResponse,
} from '../../../../exporter'
import TextBlock from './TextBlock'

const richText: RichTextItemResponse = {
  type: 'text',
  text: {
    content: '',
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
  plain_text: '',
  href: null,
}

const block = {
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
  type: '',
}

const heading1 = structuredClone(block) as Heading1BlockObjectResponse
const h1r = structuredClone(richText)
h1r.text.content = 'Heading 1'
h1r.plain_text = h1r.text.content
heading1.type = 'heading_1'
heading1.heading_1 = {
  rich_text: [h1r],
  color: 'default',
  is_toggleable: false,
}

const meta = {
  title: 'Page/TextBlock',
  component: TextBlock,
  args: {
    block: heading1,
    tag: 'h1',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextBlock>

export default meta
type Story = StoryObj<typeof meta>

/* HEADING 1 */
export const Heading1: Story = {
  args: {
    block: heading1,
    tag: 'h1',
  }
}

/* HEADING 2 */
const heading2 = structuredClone(block) as Heading2BlockObjectResponse
const h2r = structuredClone(richText)
h2r.text.content = 'Heading 2'
h2r.plain_text = h2r.text.content
heading2.type = 'heading_2'
heading2.heading_2 = {
  rich_text: [h2r],
  color: 'default',
  is_toggleable: false,
}
export const Heading2: Story = {
  args: {
    block: heading2,
    tag: 'h2',
  }
}

/* HEADING 3 */
const heading3 = structuredClone(block) as Heading3BlockObjectResponse
const h3r = structuredClone(richText)
h3r.text.content = 'Heading 3'
h3r.plain_text = h3r.text.content
heading3.type = 'heading_3'
heading3.heading_3 = {
  rich_text: [h3r],
  color: 'default',
  is_toggleable: false,
}
export const Heading3: Story = {
  args: {
    block: heading3,
    tag: 'h3',
  }
}

/* PARAGRAPH */
const p = structuredClone(block) as ParagraphBlockObjectResponseEx
p.type = 'paragraph'
const r1 = structuredClone(richText)
r1.text.content = `A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good. A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.

`
r1.plain_text = r1.text.content
p.paragraph = {
  rich_text: [r1],
  color: 'default',
}
export const Paragraph: Story = {
  args: {
    block: p,
    tag: 'p',
  }
}

/* BLOCK QUOTE */
const bq = structuredClone(block) as QuoteBlockObjectResponse
bq.type = 'quote'
const r2 = structuredClone(richText)
r2.text.content = `This principle has been a key, and a huge success in my years of software engineering. A common problem among software engineers and developers today is that they tend to over complicate problems.

`
r2.plain_text = r2.text.content
const r4 = structuredClone(richText)
r4.text.content = 'https://people.apache.org/~fhanik/kiss.html'
r4.plain_text = r4.text.content
r4.href = r4.text.content

bq.quote = {
  rich_text: [r2, r4],
  color: 'default',
}
export const BlockQuote: Story = {
  args: {
    block: bq,
    tag: 'blockquote',
  }
}

/* DIVIDER */
const dv = structuredClone(block) as DividerBlockObjectResponse
dv.type = 'divider'
dv.divider = {}
export const Divider: Story = {
  args: {
    block: dv,
    tag: 'hr',
  }
}
