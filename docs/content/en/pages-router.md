# Pages Router

With the Next.js Pages Router, the exporter runs in `getStaticProps` and `getStaticPaths`, and the components receive the fetched data as props. This page follows [examples/nextjs-pagerouter](https://github.com/linyows/rotion/tree/main/examples/nextjs-pagerouter).

## Configure a static export

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

Rotion already downloads the images and converts them to WebP, and a static export has no server for the image optimizer, so `images.unoptimized` is set.

## Import the stylesheet

```tsx filename="pages/_app.tsx"
import type { AppProps } from 'next/app'
import 'rotion/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

See [Getting started](getting-started#import-the-stylesheet) for the difference between `rotion/style.css` and `rotion/style-without-dark.css`.

## List the database

`getStaticProps` fetches the database at build time. The result is plain JSON, so it can be returned as props as it is.

```tsx filename="pages/index.tsx"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { FetchDatabase, type QueryDatabaseResponseEx } from 'rotion'
import { Table, type Link } from 'rotion/ui'

type Props = {
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const db = await FetchDatabase({ database_id: process.env.NOTION_DATABASE_ID ?? '' })
  return { props: { db } }
}

export default function Home({ db }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Table
      db={db}
      keys={['Title', 'Tags', 'Date']}
      options={{
        href: { Title: '/[id]' },
        link: NextLink as Link,
      }}
    />
  )
}
```

Unlike the App Router, the Pages Router renders the whole page as one React tree, so `next/link` can be passed to `link` directly; `createClientLink` is not needed.

## Generate a page per row

`getStaticPaths` returns one path per database row, and `getStaticProps` fetches each page.

```tsx filename="pages/[id].tsx"
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import {
  FetchBlocks,
  FetchDatabase,
  FetchPage,
  type FetchBlocksRes,
  type TitlePropertyItemObjectResponse,
} from 'rotion'
import { Page } from 'rotion/ui'

type Props = {
  title: string
  icon: string
  blocks: FetchBlocksRes
}

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await FetchDatabase({ database_id: process.env.NOTION_DATABASE_ID ?? '' })
  return {
    paths: db.results.map((page) => ({ params: { id: page.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })

  let title = ''
  if (page.meta?.object === 'list') {
    const item = page.meta.results.find((v) => v.type === 'title') as TitlePropertyItemObjectResponse | undefined
    title = item?.title.plain_text ?? ''
  }

  return {
    props: {
      title,
      icon: page.icon?.src ?? '',
      blocks,
    },
  }
}

export default function Article({ title, icon, blocks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <article>
      {icon && <img src={icon} width={160} height={160} alt="" />}
      <h1>{title}</h1>
      <Page blocks={blocks} />
    </article>
  )
}
```

`fallback: false` makes every other path a 404, which is what a static export needs: there is no server to render a page on demand.

`page.icon?.src` is the local path of the downloaded icon. An emoji icon has no file; its character is in `page.icon.emoji`.

## Pass last_edited_time

`FetchPage({ page_id, last_edited_time: 'force' })` followed by `FetchBlocks({ block_id, last_edited_time: page.last_edited_time })` is the pattern that keeps pages current when the incremental cache (`ROTION_INCREMENTAL_CACHE=true`) is on: the page is always requested, and the blocks are requested only when the page has changed since the last build. With the incremental cache off, both calls return what is in `.cache`. [App Router](app-router#pass-last_edited_time) and [Caching](caching) explain this in detail.

## Build

```bash
npm run build
```

The site is written into `out/`, including the images and files Rotion saved into `public/`.
