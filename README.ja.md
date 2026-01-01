<p align="right"><a href="https://github.com/linyows/rotion/blob/main/README.md">English</a> | 日本語</p>

<p align="center">
  <a href="https://rotion.linyo.ws">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/linyows/rotion/blob/main/misc/rotion-dark-bg.svg?raw=true">
      <img alt="Rotion" src="https://github.com/linyows/rotion/blob/main/misc/rotion.svg?raw=true" width="300">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/linyows/rotion/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/linyows/rotion/build.yml?branch=main&style=for-the-badge&labelColor=000000" alt="Github Actions" />
  </a>
  <a href="https://www.npmjs.com/package/rotion">
    <img src="http://img.shields.io/npm/v/rotion.svg?style=for-the-badge&labelColor=000000" alt="NPM" />
  </a>
</p>

**Rotion**は、Notion APIとReactを活用して、Notionのデータベースやページを静的ウェブサイトとして生成するためのコンポーネント＆ツール群です。  
Next.jsをはじめとしたReact系フレームワークでの利用を想定していますが、他のフレームワークでも動作します。  
画像や必要なファイルはローカルに保存されるため、完全な静的サイト生成が可能です。

公式サイト: https://rotion.linyo.ws

主な特徴
--

- Notion APIからデータベース・ページを取得し、静的サイト用データとして変換
- 画像やPDFなどのファイルもローカル保存
- 豊富なReactコンポーネント（Gallery, Table, List, Page, 各種Blockなど）
- Next.jsなどの静的サイトジェネレーターと親和性が高い
- **Next.js App Router サポート** - `createClientLink` ヘルパー（v2.0.1以降）
- **Next.js Page Router サポート** - 従来のSSGワークフロー
- TypeScript対応

インストール
--

```bash
npm install rotion
```

または

```bash
yarn add rotion
```

使い方
--

### 1. Notion APIのセットアップ

Notionインテグレーションを作成し、APIキーとデータベースIDを取得します：

1. [Notion Integrations](https://www.notion.so/my-integrations) にアクセス
2. 新しいインテグレーションを作成
3. インテグレーショントークンをコピー
4. Notionページ/データベースをインテグレーションと共有
5. ページ/データベースIDをURLからコピー

### 2. データの取得

`rotion` から提供されるAPIを使ってNotionからデータを取得します：

```ts
import { FetchDatabase, FetchBlocks, FetchPage } from 'rotion'

// データベースを取得
const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })

// ページブロックを取得
const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })

// ページ情報を取得
const page = await FetchPage({ page_id: 'YOUR_PAGE_ID' })
```

### 3. Reactコンポーネントで表示

#### Next.js App Router (v15+)

Next.js App Router では、`createClientLink` ヘルパーのセットアップが必要です：

**ステップ1:** `app/lib/rotion.ts` を作成：
```tsx
'use client'

import { createClientLink } from 'rotion/ui'
import NextLink from 'next/link'

export const ClientLink = createClientLink(NextLink)
```

**ステップ2:** Server Component で使用：
```tsx
// app/page.tsx
import { Page } from 'rotion/ui'
import { FetchBlocks } from 'rotion'
import { ClientLink } from './lib/rotion'
import type { Link } from 'rotion/ui'

export default async function MyPage() {
  const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })
  return <Page blocks={blocks} link={ClientLink as Link} />
}
```

#### Next.js Page Router

Page Router では、Next.js の Link を直接使用できます：

```tsx
// pages/index.tsx
import type { GetStaticProps } from 'next'
import { Page } from 'rotion/ui'
import { FetchBlocks } from 'rotion'
import NextLink from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })
  return { props: { blocks } }
}

export default function MyPage({ blocks }) {
  return <Page blocks={blocks} link={NextLink} />
}
```

#### データベースビュー

Notionデータベースをさまざまな形式で表示：

```tsx
import { Gallery, Table, List } from 'rotion/ui'
import { FetchDatabase } from 'rotion'

const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })

// ギャラリービュー
<Gallery db={db} keys={['Name', 'Description', 'Image']} />

// テーブルビュー
<Table db={db} keys={['Name', 'Status', 'Date']} />

// リストビュー
<List db={db} keys={['Name', 'Tags']} />
```

主なエクスポート
--

### データ取得用関数（`rotion` から）

- `FetchDatabase` - Notionデータベースの取得とキャッシュ
- `FetchBlocks` - ページブロックの取得とキャッシュ
- `FetchPage` - ページ情報の取得
- `FetchBreadcrumbs` - パンくずリスト情報の取得

### UIコンポーネント（`rotion/ui` から）

**データベースビュー:**
- `Gallery` - ギャラリービュー
- `Table` - テーブルビュー
- `List` - リストビュー

**ページとブロック:**
- `Page` - Notionページ全体を表示
- 各種Blockコンポーネント（TextBlock, ImageBlock, CodeBlock, CalloutBlock など）

**ユーティリティ:**
- `Icon` - Notionアイコンの表示
- `RichText` - Notionリッチテキストの表示
- `Checkbox` - チェックボックスの表示
- `createClientLink` - Next.js App Router用ヘルパー（v2.0.1以降）

サンプル
--

`examples/` ディレクトリには、Notionデータベース連携を実演する完全なサンプルが含まれています。

### データベースのセットアップ

すべてのサンプルは、以下のプロパティを持つNotionデータベースが必要です：

| プロパティ名 | プロパティ型 |
|------------|-------------|
| Title      | `title`     |
| Tags       | `multi_select`|
| Date       | `date`      |

### [app-router](./examples/app-router)
データベース対応のNext.js App Routerサンプル：
- インデックスページにデータベーステーブルビュー
- 個別記事用の動的 `[id]` ルート
- `generateStaticParams` を使ったServer Components
- CSS Modulesによるスタイリング

```bash
cd examples/app-router
cp .env.example .env.local
# NOTION_TOKENとNOTION_DATABASE_IDを設定
npm install
npm run dev
```

### [page-router](./examples/page-router)
データベース対応のNext.js Pages Routerサンプル：
- `getStaticProps` を使ったデータベーステーブルビュー
- `getStaticPaths` による動的 `[id]` ルート
- 従来のSSGワークフロー

```bash
cd examples/page-router
cp .env.example .env.local
# NOTION_TOKENとNOTION_DATABASE_IDを設定
npm install
npm run dev
```

### [astro](./examples/astro)
データベース対応のAstroサンプル：
- `.astro` ファイルでのデータベーステーブルビュー
- `getStaticPaths` による動的ルート
- `client:load` によるReactコンポーネント

```bash
cd examples/astro
cp .env.example .env
# NOTION_TOKENとNOTION_DATABASE_IDを設定
npm install
npm run dev
```

各サンプルのデモ内容：
- 3つのプロパティすべてを表示するデータベーステーブルビュー
- 完全なコンテンツを持つ個別記事ページ
- データベースと記事ビュー間のナビゲーション

スクリプト
--

- `npm run build` - ビルド
- `npm run test` - テスト
- `npm run story` - Storybookの起動

必要な環境
--

- Node.js 18以上推奨
- React 17、18、または19
- Next.js 13以上（App Router機能を使う場合はNext.js 15以上推奨）

ライセンス
--

MIT

作者
--

[@linyows](https://github.com/linyows) 