# App Router

This page builds a static site with the Next.js App Router: an index page that lists a Notion database, and one page per database row. It follows [examples/nextjs-approuter](https://github.com/linyows/rotion/tree/main/examples/nextjs-approuter).

## Configure a static export

Rotion's data is fetched at build time, so the site can be exported as plain files. Set `output: 'export'`, and turn off the image optimizer: the images are already downloaded and converted to WebP by Rotion, and a static export has no server to run the optimizer on.

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

`next build` then writes the site into `out/`.

## Wrap next/link with createClientLink

Every component in `rotion/ui` is a client component. Rotion's components accept a `link` prop so that the links they render go through your router, but a server component cannot pass a function it defines to a client component. `createClientLink` returns a wrapper; defined in a file marked `'use client'`, the wrapper becomes a client reference that a server component can pass on.

```tsx filename="app/components/ClientLink.tsx"
'use client'

import { createClientLink } from 'rotion/ui'
import NextLink from 'next/link'

export const ClientLink = createClientLink(NextLink)
```

Pass `ClientLink` wherever a component takes `link`, casting it to Rotion's `Link` type.

## List the database

A server component can call the exporter directly and hand the result to a Rotion component. `href` maps a property name to a path; `[id]` in the path is replaced with the page ID.

```tsx filename="app/page.tsx"
import { FetchDatabase } from 'rotion'
import { Table } from 'rotion/ui'
import type { Link } from 'rotion/ui'
import { ClientLink } from './components/ClientLink'

export default async function Home() {
  const db = await FetchDatabase({ database_id: process.env.NOTION_DATABASE_ID ?? '' })

  return (
    <Table
      db={db}
      keys={['Title', 'Tags', 'Date']}
      options={{
        href: { Title: '/[id]' },
        link: ClientLink as Link,
      }}
    />
  )
}
```

Every call with the same arguments reads the same cache file, so the layout, `generateMetadata` and the page can each call `FetchDatabase` without extra requests to Notion.

## Generate a page per row

`generateStaticParams` returns one entry per database row. Each page then fetches its own properties with `FetchPage` and its content with `FetchBlocks`.

```tsx filename="app/[id]/page.tsx"
import { FetchBlocks, FetchDatabase, FetchPage } from 'rotion'
import type { TitlePropertyItemObjectResponse } from 'rotion'
import { Page } from 'rotion/ui'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const db = await FetchDatabase({ database_id: process.env.NOTION_DATABASE_ID ?? '' })
  return db.results.map((page) => ({ id: page.id }))
}

export default async function Article({ params }: Props) {
  const { id } = await params
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })

  let title = ''
  if (page.meta?.object === 'list') {
    const item = page.meta.results.find((v) => v.type === 'title') as TitlePropertyItemObjectResponse | undefined
    title = item?.title.plain_text ?? ''
  }

  return (
    <article>
      <h1>{title}</h1>
      <Page blocks={blocks} />
    </article>
  )
}
```

`page.meta` holds the page's property values as returned by the Notion property API. The title property comes back as a list of items, one per rich text segment; the example above reads the first one.

Child pages and child databases inside the content are rendered without a link unless you pass `href` to `<Page>`. With `href="/[id]"` they link to `/` plus their ID; with any other key in brackets, such as `href="/[title]"`, to `/` plus their title, lowercased and URL-encoded with spaces turned into `-`. Pass `link={ClientLink as Link}` as well so that these links use `next/link`. Your routes have to generate those paths too.

`page.icon?.src` and `page.cover?.src` hold the local paths of the downloaded icon and cover, if the page has them.

## Pass last_edited_time

`FetchPage` and `FetchBlocks` take an optional `last_edited_time`. It matters only when the incremental cache is on (`ROTION_INCREMENTAL_CACHE=true`): the cached page or blocks are reused while the value you pass equals the one stored in the cache, and fetched again when it differs. Without it, the cache is always reused and edits never show up.

The example gets that value in two steps. `FetchPage` with `'force'` never matches a cached value, so it always asks the API for the current page; its `last_edited_time` then decides whether the blocks need fetching. When the page comes from `FetchDatabase`, its `last_edited_time` is already in `db.results`, and one step is enough:

```ts
for (const page of db.results) {
  const blocks = await FetchBlocks({ block_id: page.id, last_edited_time: page.last_edited_time })
}
```

Use the page's value, not a block's. Editing a block inside a toggle or column updates only the page's `last_edited_time`, so Rotion passes the page's value down to nested blocks. [Caching](caching) covers the rest of the cache behaviour.

## Build

```bash
npm run build
```

`out/` now contains the HTML, and `out/images` and `out/files` the files Rotion downloaded into `public/`.
