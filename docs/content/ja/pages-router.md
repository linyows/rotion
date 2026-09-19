# Pages Router

Next.js Pages Router では、エクスポーターを `getStaticProps` と `getStaticPaths` の中で呼び、取得したデータを props としてコンポーネントに渡します。
内容は [examples/nextjs-pagerouter](https://github.com/linyows/rotion/tree/main/examples/nextjs-pagerouter) に沿っています。

## 静的エクスポートの設定

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

画像は Rotion がダウンロードして WebP に変換済みで、静的エクスポートには画像の最適化を実行するサーバーもありません。
そのため `images.unoptimized` を指定します。

## スタイルシートの読み込み

```tsx filename="pages/_app.tsx"
import type { AppProps } from 'next/app'
import 'rotion/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

`rotion/style.css` と `rotion/style-without-dark.css` の違いは[はじめかた](getting-started#import-the-stylesheet)にあります。

## データベースの一覧

`getStaticProps` で、ビルド時にデータベースを取得します。
結果はただの JSON なので、そのまま props として返せます。

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

Pages Router はページ全体を1つの React ツリーとして描画します。
そのため App Router と違い、`next/link` をそのまま `link` に渡せます。
`createClientLink` は必要ありません。

## 行ごとのページの生成

`getStaticPaths` がデータベースの行ごとにパスを返し、`getStaticProps` が各ページを取得します。

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

`fallback: false` を指定すると、それ以外のパスはすべて404になります。
静的エクスポートにはページをその場で描画するサーバーがないので、この指定が必要です。

`page.icon?.src` は、ダウンロードしたアイコンのローカルパスです。
絵文字のアイコンにはファイルがなく、文字は `page.icon.emoji` に入っています。

## last_edited_time を渡す

`FetchPage({ page_id, last_edited_time: 'force' })` のあとに `FetchBlocks({ block_id, last_edited_time: page.last_edited_time })` を呼ぶのは、インクリメンタルキャッシュ（`ROTION_INCREMENTAL_CACHE=true`）が有効なときにページを最新に保つための書き方です。
ページは毎回取得し、ブロックは前回のビルドからページが変わったときだけ取得します。
インクリメンタルキャッシュが無効なら、どちらの呼び出しも `.cache` の内容を返します。
詳しくは [App Router](app-router#pass-last_edited_time) と[キャッシュ](caching)で説明しています。

## ビルド

```bash
npm run build
```

サイトは `out/` に書き出されます。
Rotion が `public/` に保存した画像とファイルも含まれます。
