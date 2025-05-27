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

Notionのインテグレーションを作成し、APIキーとデータベースIDを取得してください。

### 2. データのエクスポート

`src/exporter`配下のAPIを使って、Notionからデータを取得し、静的ファイルとして保存します。

例:
```ts
import { FetchDatabase, FetchBlocks } from 'rotion'

const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })
const page = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })
```

### 3. Reactコンポーネントで表示

`src/ui`配下の各種コンポーネントを使って、取得したデータを表示できます。

例:
```tsx
import { Gallery } from 'rotion/ui'

<Gallery db={db} keys={['Name', 'Description']} />
```

主なエクスポート
--

### データ取得用関数（exporter）

- `FetchDatabase` - データベースの取得・ローカルキャッシュ
- `FetchBlocks` - ページブロックの取得・ローカルキャッシュ
- `FetchPage` - ページ情報の取得
- `FetchBreadcrumbs` - パンくずリスト情報の取得

### UIコンポーネント

- `Gallery`, `Table`, `List` - Notionデータベースの各種表示
- `Page` - Notionページの表示
- 各種Blockコンポーネント（TextBlock, ImageBlock, CodeBlock, ...）
- `Icon`, `RichText`, `Checkbox` など

スクリプト
--

- `npm run build` - ビルド
- `npm run test` - テスト
- `npm run story` - Storybookの起動

必要な環境
--

- Node.js 18以上推奨
- React 17/18/19対応

ライセンス
--

MIT

作者
--

[@linyows](https://github.com/linyows) 