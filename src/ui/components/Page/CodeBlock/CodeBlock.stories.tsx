import type { Meta, StoryObj } from '@storybook/react'
import type { CodeBlockObjectResponse, RichTextItemResponse } from '../../../../exporter'
import CodeBlock from './CodeBlock'
import Prism from 'prismjs'

import 'prismjs/themes/prism.min.css'
// import 'prismjs/themes/prism-tomorrow.min.css'
import 'prismjs/plugins/autoloader/prism-autoloader'
if (Prism.plugins.autoloader) {
  Prism.plugins.autoloader.languages_path = 'https://unpkg.com/prismjs@1.29.0/components/'
}

const examples = {
  typescript: `type Text = {
  href: string
  anotaion: {
    color: string
    bold: boolean
  }
}`,
  bash: `$ hostname
notion
$ ps auxf
...`,
  go: `func main() {
    v := "world"
    fmt.Printf("hello %s!", v)
}`,
  sql: 'select id, created_at from users where username = "notion";',
  mermaid: `sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!`
}

const richText: RichTextItemResponse = {
  type: 'text',
  text: {
    content: examples.bash,
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
  plain_text: examples.bash,
  href: null,
}

const block: CodeBlockObjectResponse = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  type: 'code',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  code: {
    rich_text: [richText],
    caption: [],
    language: 'bash',
  },
  created_time: '2024-01-07T01:52:00.000Z',
  last_edited_time: '2024-01-07T01:52:00.000Z',
  created_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab'
  },
  last_edited_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab'
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

export const Bash: Story = {}

const go = structuredClone(block)
// @ts-ignore
go.code.rich_text[0].text.content = examples.go
go.code.rich_text[0].plain_text = examples.go
go.code.language = 'go'
export const Go: Story = {
  args: {
    block: go
  }
}

const ts = structuredClone(block)
// @ts-ignore
ts.code.rich_text[0].text.content = examples.typescript
ts.code.rich_text[0].plain_text = examples.typescript
ts.code.language = 'typescript'
export const TypeScript: Story = {
  args: {
    block: ts
  }
}

const sql = structuredClone(block)
// @ts-ignore
sql.code.rich_text[0].text.content = examples.sql
sql.code.rich_text[0].plain_text = examples.sql
sql.code.language = 'sql'
export const SQL: Story = {
  args: {
    block: sql
  }
}

const mermaid = structuredClone(block)
// @ts-ignore
mermaid.code.rich_text[0].text.content = examples.mermaid
mermaid.code.rich_text[0].plain_text = examples.mermaid
mermaid.code.language = 'mermaid'
export const Mermaid: Story = {
  args: {
    block: mermaid
  }
}
