# App Router

このページでは、Next.js App Router で静的サイトを作ります。
Notion のデータベースを一覧するトップページと、データベースの行ごとのページからなるサイトです。
内容は [examples/nextjs-approuter](https://github.com/linyows/rotion/tree/main/examples/nextjs-approuter) に沿っています。

## 静的エクスポートの設定

Rotion のデータはビルド時に取得するので、サイトはファイルだけで書き出せます。
`output: 'export'` を指定し、画像の最適化を無効にします。
画像は Rotion がダウンロードして WebP に変換済みで、しかも静的エクスポートには最適化を実行するサーバーがないからです。

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

`next build` を実行すると、サイトが `out/` に書き出されます。

## createClientLink による next/link のラップ [#wrap-nextlink-with-createclientlink]

`rotion/ui` のコンポーネントはすべてクライアントコンポーネントです。
Rotion のコンポーネントは `link` プロパティを受け取り、描画するリンクをルーター経由にできます。
しかし、サーバーコンポーネントは自分で定義した関数をクライアントコンポーネントに渡せません。
`createClientLink` はラッパーを返します。
これを `'use client'` を付けたファイルで定義すると、ラッパーはクライアント参照になり、サーバーコンポーネントからも渡せるようになります。

```tsx filename="app/components/ClientLink.tsx"
'use client'

import { createClientLink } from 'rotion/ui'
import NextLink from 'next/link'

export const ClientLink = createClientLink(NextLink)
```

`link` を受け取るコンポーネントには、`ClientLink` を Rotion の `Link` 型にキャストして渡します。

## データベースの一覧

サーバーコンポーネントからは、エクスポーターを直接呼び、結果を Rotion のコンポーネントに渡せます。
`href` はプロパティ名からパスへの対応です。
パスの中の `[id]` はページ ID に置き換わります。

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

同じ引数の呼び出しは同じキャッシュファイルを読みます。
そのため、レイアウト、`generateMetadata`、ページのそれぞれで `FetchDatabase` を呼んでも、Notion へのリクエストは増えません。

## 行ごとのページの生成

`generateStaticParams` は、データベースの行ごとに1つずつエントリを返します。
各ページは、プロパティを `FetchPage` で、本文を `FetchBlocks` で取得します。

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

`page.meta` には、Notion のプロパティ API が返したプロパティの値が入っています。
タイトルプロパティは、リッチテキストの区切りごとに1つずつの項目のリストとして返ってきます。
上の例では最初の項目を読んでいます。

本文の中の子ページと子データベースは、`<Page>` に `href` を渡さない限りリンクになりません。
`href="/[id]"` なら `/` に ID を続けたパスへ、`href="/[title]"` のように角括弧の中がそれ以外のキーなら、`/` にタイトルを続けたパスへリンクします。
タイトルは小文字にして URL エンコードし、空白を `-` に置き換えたものです。
これらのリンクに `next/link` を使わせるには、`link={ClientLink as Link}` もあわせて渡します。
リンク先のパスは、ルーティングの側でも生成しておく必要があります。

`page.icon?.src` と `page.cover?.src` には、ページにアイコンやカバーがあれば、ダウンロードしたファイルのローカルパスが入っています。

## last_edited_time を渡す [#pass-last_edited_time]

`FetchPage` と `FetchBlocks` は、省略可能な引数 `last_edited_time` を受け取ります。
これが意味を持つのは、インクリメンタルキャッシュ（`ROTION_INCREMENTAL_CACHE=true`）が有効なときだけです。
渡した値がキャッシュに保存された値と等しいあいだはキャッシュのページやブロックを使い、異なれば取得し直します。
渡さなければキャッシュが常に使われ、編集は反映されません。

上の例では、この値を2段階で得ています。
`'force'` を渡した `FetchPage` はキャッシュの値と一致することがないので、常に API から現在のページを取得します。
その `last_edited_time` によって、ブロックを取得し直すかどうかが決まります。
ページを `FetchDatabase` から得る場合は、`db.results` にすでに `last_edited_time` が入っているので、1段階で済みます。

```ts
for (const page of db.results) {
  const blocks = await FetchBlocks({ block_id: page.id, last_edited_time: page.last_edited_time })
}
```

渡すのはブロックの値ではなく、ページの値です。
トグルやカラムの中のブロックを編集しても、更新されるのはページの `last_edited_time` だけです。
そのため Rotion は、ページの値をネストしたブロックにも引き継ぎます。
キャッシュのそのほかの挙動は[キャッシュ](caching)で説明しています。

## ビルド

```bash
npm run build
```

`out/` に HTML が、`out/images` と `out/files` に Rotion が `public/` にダウンロードしたファイルが出力されます。
