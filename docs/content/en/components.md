# Components

Everything on this page is imported from `rotion/ui`. The components take the objects returned by the functions in [API](api) and render them; they do not fetch anything themselves.

```tsx
import { Page, Table, List, Gallery, Calendar } from 'rotion/ui'
```

Every module in `rotion/ui` is marked `'use client'`. In the Next.js App Router, a server component can still render them and pass the fetched data as props, because the data is plain JSON. A function prop such as `link` needs a client reference; see [createClientLink](#createclientlink).

## Page

Renders the content of a Notion page.

```tsx
const blocks = await FetchBlocks({ block_id: pageId })

<Page blocks={blocks} />
```

| Prop | Type | Description |
|------|------|-------------|
| `blocks` | `ListBlockChildrenResponseEx` | The value `FetchBlocks` returns. Required. |
| `href` | `string` | Path pattern for links to child pages and child databases. `'/[id]'` links to `/` plus the page or database ID; any other key in brackets, such as `'/[title]'`, links to `/` plus the title, lowercased and URL-encoded with spaces turned into `-`. Without `href`, they are not linked. |
| `link` | `Link` | Component used for those links instead of `<a>`. |
| `query` | `ParsedUrlQueryInput` | Query parameters added to links to child databases and to breadcrumb entries. |
| `breadcrumb_hrefs` | `string[]` | Paths for the entries of a breadcrumb block, one per entry, in the format of `hrefs` of [Breadcrumbs](#breadcrumbs). |

Consecutive list items are grouped into one `<ul>` or `<ol>`. Headings get an `id` made from the last 8 characters of the block ID, which is what [TableOfContents](#tableofcontents) links to. Block types Rotion does not render are skipped. The showcase has one page per block type, starting with [paragraph](blocks/paragraph).

Code blocks are highlighted with [Prism](https://prismjs.com) in the browser. The language definitions and the theme (`prism.min.css`, or `prism-tomorrow.min.css` when the system is in dark mode) are loaded from `unpkg.com` when the page runs. The theme follows the system setting even with `style-without-dark.css`. A code block whose language is `mermaid` is rendered as a [Mermaid](https://mermaid.js.org) diagram instead.

## Database views

`Table`, `List`, `Gallery` and `Calendar` render the result of `FetchDatabase`. Their props and options are described in [Database views](database-views).

| Component | Props |
|-----------|-------|
| `Table` | `db`, `keys`, `options?: TableOptions` |
| `List` | `db`, `keys`, `options?: ListOptions` |
| `Gallery` | `db`, `keys`, `options?: GalleryOptions` |
| `Calendar` | `db`, `keys`, `date`, `options?: CalendarOptions` |

## Breadcrumbs

Renders the result of `FetchBreadcrumbs` as a path of links separated by `/`.

```tsx
const list = await FetchBreadcrumbs({ type: 'page_id', id: pageId })

<Breadcrumbs list={list} hrefs={['/', '/[id]', '/[id]']} />
```

| Prop | Type | Description |
|------|------|-------------|
| `list` | `Breadcrumb[]` | The value `FetchBreadcrumbs` returns. |
| `hrefs` | `string[]` | One path per entry, in the same order. `'/'` is used as it is; `'/[id]'` becomes `/` plus the entry's ID; any other key in brackets becomes `/` plus the entry's name, lowercased and URL-encoded with spaces turned into `-`. An entry without a path is not linked. |
| `link` | `Link` | Component used for the links instead of `<a>`. |
| `query` | `ParsedUrlQueryInput` | Query parameters added to the links. |

A breadcrumb block inside a page is rendered with the same component; pass its paths to `<Page>` as `breadcrumb_hrefs`.

## TableOfContents

Builds a nested list of links from the headings in a page's top-level blocks.

```tsx
<TableOfContents blocks={blocks} />
```

| Prop | Type | Description |
|------|------|-------------|
| `blocks` | `ListBlockChildrenResponseEx` | The value `FetchBlocks` returns. |

Each link points to `#` plus the heading's `id`, as rendered by `<Page>`. Use it to place a table of contents outside the page content, such as in a sidebar. A table of contents block written in Notion is rendered by `<Page>` itself; see [table of contents](blocks/table-of-contents).

`GenHtmlId(blockId)` returns the `id` that `<Page>` gives a heading, if you build your own navigation.

## RichText

Renders one rich text item: text with its annotations (bold, italic, strikethrough, underline, code, color), links, mentions and inline equations.

```tsx
{title.map((item, i) => <RichText key={i} textObject={item} />)}
```

| Prop | Type | Description |
|------|------|-------------|
| `textObject` | `RichTextItemResponse` | One element of a `rich_text` or `title` array. |

## Icon

Renders one of the SVG icons Rotion uses internally.

| Prop | Type | Description |
|------|------|-------------|
| `name` | `'figma' \| 'slack' \| 'github' \| 'file' \| 'link' \| 'codemerge' \| 'circlecheck' \| 'circledot' \| 'downloadfile'` | Which icon. |
| `width`, `height` | `string` | Size, such as `'20px'`. Each icon has its own default. |
| `className` | `string` | Extra class name. |

## Checkbox

Renders a checked or unchecked box, as Notion shows a checkbox property.

| Prop | Type | Description |
|------|------|-------------|
| `bool` | `boolean` | Whether the box is checked. |

## createClientLink

```ts
function createClientLink<T extends ComponentType<any>>(LinkComponent: T): FC<ComponentProps<T>>
```

Wraps a link component, such as `next/link`, in a new function component that renders it with the same props. Call it in a file marked `'use client'` and export the result; a server component can then pass it as `link`.

```tsx filename="app/components/ClientLink.tsx"
'use client'

import { createClientLink } from 'rotion/ui'
import NextLink from 'next/link'

export const ClientLink = createClientLink(NextLink)
```

```tsx
import type { Link } from 'rotion/ui'
import { ClientLink } from './components/ClientLink'

<Page blocks={blocks} href="/[id]" link={ClientLink as Link} />
```

The Pages Router and other setups without server components can pass `next/link` (or any compatible component) directly.

## Link

```ts
interface Link extends React.FC<{
  children: string | React.ReactNode
  className?: string
  href: string | UrlObject
}> {}
```

The type of every `link` prop. Rotion calls it with `className`, `children`, and an `href` that is either a path or `{ pathname, query }` when a `query` is set. `next/link` fits this shape; cast it with `as Link` where TypeScript does not accept it as it is.

## Other exports

`rotion/ui` also exports the component of each block type (`TextBlock`, `ImageBlock`, `CodeBlock`, `CalloutBlock`, and so on) and each property field of the views (`TableTitleField`, `GalleryCard`, `ListDateField`, and so on). `<Page>` and the views use them internally; they are exported so that you can render a single block or field on its own.

Among the helper functions, `BuildPlainTextByPage(blocks)` returns the plain text of a page's top-level paragraphs, which is handy for a meta description.

## Theming

The stylesheet (`rotion/style.css` or `rotion/style-without-dark.css`) defines its colors, fonts and borders as CSS custom properties on `:root`, all prefixed with `--rotion-`. Override them after importing the stylesheet:

```css filename="app/globals.css"
:root {
  --rotion-font-family: 'Inter', sans-serif;
  --rotion-primary-text: rgb(20, 20, 20);
  --rotion-link-color: rgb(0, 102, 204);
  --rotion-border-radius: 6px;
}
```

The main groups are:

| Group | Examples |
|-------|----------|
| Base | `--rotion-font-family`, `--rotion-border-radius`, `--rotion-line-height` |
| Text | `--rotion-primary-text`, `--rotion-secondary-text`, `--rotion-tertiary-text` |
| Borders | `--rotion-border-color`, `--rotion-border`, `--rotion-border-hover` |
| Code, table, toggle, quote | `--rotion-code-bg-color`, `--rotion-table-header-bg-color`, `--rotion-toggle-hover-bg-color`, `--rotion-quote-border-color` |
| Links | `--rotion-link-color`, `--rotion-link-hover-color`, `--rotion-link-border-bottom`, `--rotion-link-hover-bg-color` |
| Text colors and backgrounds from Notion | `--rotion-annot-<color>`, `--rotion-annot-bg-<color>` for `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red` |
| Select and multi-select tags | `--rotion-tag-<color>`, `--rotion-tag-bg-<color>`, same colors |
| Gallery | `--rotion-gallery-box-shadow`, `--rotion-gallery-bg`, `--rotion-gallery-grid-template-columns-small` / `-medium` / `-large` |
| Table view | `--rotion-table-border`, `--rotion-table-icon-fill` |
| Calendar | `--rotion-calendar-weekend-bg` |

Every class name the components render starts with `rotion-`, so you can also target elements directly.

### Dark mode

Most color variables have a dark counterpart named with `-dark-`, such as `--rotion-dark-primary-text` for `--rotion-primary-text`. `rotion/style.css` switches to the dark variables inside `@media (prefers-color-scheme: dark)`, so the components follow the operating system's setting. To change the dark colors, override the `--rotion-dark-*` variables.

`rotion/style-without-dark.css` is built from the same source with those media queries removed; the components then always use the light variables. Use it when your site has no dark theme, or when it switches themes by other means: set the light variables to your dark colors under your own selector, such as `html.dark`.
