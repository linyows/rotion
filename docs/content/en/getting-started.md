# Getting started

This page takes one Notion page to a rendered page in a Next.js App Router project. The same steps apply to other frameworks; only the place where you call the exporter changes.

## Requirements

- Node.js 20.9 or later. Rotion converts images with [sharp](https://sharp.pixelplumbing.com), which requires it.
- React 17, 18 or 19 (a peer dependency).
- A Notion workspace where you can create an integration.

## Install

```bash
npm install rotion
```

## Create a Notion integration

Rotion reads Notion through an integration token.

1. Open [Notion integrations](https://www.notion.so/my-integrations) and create an internal integration for your workspace. Read access to content is enough.
2. Copy the integration's secret. This is the value of `NOTION_TOKEN`.
3. In Notion, open each page or database you want to publish, and add the integration from the page menu (`•••` → Connections). Pages below a connected page are shared too.

An integration sees nothing that has not been shared with it. A page that is not shared makes the API answer "object not found".

## Find page and database IDs

The ID is the 32-character hexadecimal string at the end of a Notion URL.

- Page: `https://www.notion.so/My-Page-1429989fe8ac4effbc8f57f56486db54` → `1429989fe8ac4effbc8f57f56486db54`
- Database: `https://www.notion.so/<workspace>/668d797c76fa49349b05ad288df2d136?v=...` → `668d797c76fa49349b05ad288df2d136` (the part before `?v=`, not the view ID)

The API accepts the ID with or without hyphens.

## Set NOTION_TOKEN

Rotion reads the token from the `NOTION_TOKEN` environment variable. In Next.js, put it in `.env.local`, which Next.js loads before your code runs, and keep the file out of git.

```bash filename=".env.local"
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PAGE_ID=1429989fe8ac4effbc8f57f56486db54
```

`NOTION_PAGE_ID` is not read by Rotion; it is just a convenient place for the ID used below. Other settings are listed in [Configuration](configuration).

## Fetch a page and render it

`FetchBlocks` returns the blocks of a page, with nested blocks and downloaded files already resolved. `<Page>` renders them.

```tsx filename="app/page.tsx"
import { FetchBlocks } from 'rotion'
import { Page } from 'rotion/ui'

export default async function Home() {
  const blocks = await FetchBlocks({ block_id: process.env.NOTION_PAGE_ID ?? '' })
  return <Page blocks={blocks} />
}
```

Run `npm run dev` and open the page. The first request calls the Notion API, writes the response into `.cache/`, and saves images into `public/images/`. Add both to `.gitignore`:

```text filename=".gitignore"
.cache/
public/images/
public/files/
```

> [!NOTE]
>
> By default Rotion reuses what is in `.cache` forever, so a later edit in Notion does not show up until you delete `.cache` or turn on the incremental cache. [Caching](caching) explains both.

## Import the stylesheet

The components render class names only; their styles are in a stylesheet you import once, for example in the root layout.

```tsx filename="app/layout.tsx"
import 'rotion/style.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

The package exports two builds of the same stylesheet:

| Import | Dark mode |
|--------|-----------|
| `rotion/style.css` | Follows the operating system: rules inside `@media (prefers-color-scheme: dark)` switch the colors to the `--rotion-dark-*` values. |
| `rotion/style-without-dark.css` | The same stylesheet with every `prefers-color-scheme` media query removed, so the components always use the light colors. |

Use `style-without-dark.css` when your site has no dark theme, or when it switches themes by its own means (a class or a toggle) and you override the `--rotion-*` variables yourself. See [Components](components#theming) for the variables.

## Next steps

- Build a site from a database, with one page per row: [App Router](app-router) or [Pages Router](pages-router).
- Show the database itself as a table, list, gallery or calendar: [Database views](database-views).
- Look at complete projects: [Examples](examples).
