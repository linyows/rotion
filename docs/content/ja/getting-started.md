# はじめかた

このページでは、Next.js App Router のプロジェクトで、Notion のページを1つ描画するところまでを説明します。
ほかのフレームワークでも手順は同じで、エクスポーターを呼ぶ場所だけが変わります。

## 必要なもの

- Node.js 22.12 以降。Rotion が画像の変換に使う [sharp](https://sharp.pixelplumbing.com) と、図の描画に使う [mermaid](https://mermaid.js.org) がこのバージョンを要求します。
- React 17、18、19 のいずれか（peer dependency）。
- インテグレーションを作成できる Notion のワークスペース。

## インストール

```bash
npm install rotion
```

## Notion インテグレーションの作成 [#create-a-notion-integration]

Rotion は、インテグレーションのトークンを使って Notion を読みます。

1. [Notion Integrations](https://www.notion.so/my-integrations) を開き、ワークスペースに内部インテグレーションを作成します。コンテンツの読み取り権限があれば十分です。
2. インテグレーションのシークレットをコピーします。これが `NOTION_TOKEN` の値です。
3. Notion で公開したいページやデータベースを開き、ページのメニュー（`•••` → コネクト）からインテグレーションを追加します。接続したページの下にあるページも共有されます。

インテグレーションは、共有されていないものを一切読めません。
共有していないページを指定すると、API は "object not found" を返します。

## ページとデータベースの ID

ID は、Notion の URL の末尾にある32文字の16進数です。

- ページ：`https://www.notion.so/My-Page-1429989fe8ac4effbc8f57f56486db54` → `1429989fe8ac4effbc8f57f56486db54`
- データベース：`https://www.notion.so/<workspace>/668d797c76fa49349b05ad288df2d136?v=...` → `668d797c76fa49349b05ad288df2d136`（`?v=` より前の部分です。ビューの ID ではありません）

API は、ハイフンの有無にかかわらず ID を受け付けます。

## NOTION_TOKEN の設定

Rotion はトークンを環境変数 `NOTION_TOKEN` から読みます。
Next.js では `.env.local` に書きます。
Next.js はアプリケーションのコードより先にこのファイルを読み込みます。
このファイルは git の管理から外してください。

```bash filename=".env.local"
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PAGE_ID=1429989fe8ac4effbc8f57f56486db54
```

`NOTION_PAGE_ID` は Rotion が読む変数ではなく、下のコードで使う ID を置いておくためのものです。
ほかの設定は[設定](configuration)にあります。

## ページの取得と描画

`FetchBlocks` はページのブロックを返します。
ネストしたブロックもダウンロードしたファイルも、この時点で解決済みです。
それを `<Page>` が描画します。

```tsx filename="app/page.tsx"
import { FetchBlocks } from 'rotion'
import { Page } from 'rotion/ui'

export default async function Home() {
  const blocks = await FetchBlocks({ block_id: process.env.NOTION_PAGE_ID ?? '' })
  return <Page blocks={blocks} />
}
```

`npm run dev` を実行してページを開きます。
最初のリクエストで Notion API が呼ばれ、レスポンスが `.cache/` に、画像が `public/images/` に保存されます。
どちらも `.gitignore` に加えます。

```text filename=".gitignore"
.cache/
public/images/
public/files/
```

> [!NOTE]
>
> デフォルトでは、Rotion は `.cache` の内容をいつまでも使い続けます。
> そのため、Notion で編集しても、`.cache` を削除するかインクリメンタルキャッシュを有効にするまで反映されません。
> どちらも[キャッシュ](caching)で説明しています。

## スタイルシートの読み込み [#import-the-stylesheet]

コンポーネントが出力するのはクラス名だけで、スタイルは別のスタイルシートにあります。
ルートのレイアウトなどで一度だけ import します。

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

パッケージは、同じスタイルシートを2種類提供しています。

| import | ダークモード |
|--------|-------------|
| `rotion/style.css` | OS の設定に従います。`@media (prefers-color-scheme: dark)` の中のルールが、色を `--rotion-dark-*` の値に切り替えます。 |
| `rotion/style-without-dark.css` | 同じスタイルシートから `prefers-color-scheme` のメディアクエリをすべて除いたものです。コンポーネントは常にライトの色を使います。 |

サイトにダークテーマがない場合や、クラスやトグルなど独自の方法でテーマを切り替え、`--rotion-*` 変数を自分で上書きする場合は、`style-without-dark.css` を使います。
変数の一覧は[コンポーネント](components#theming)にあります。

## 次のステップ

- データベースの行ごとにページを作る：[App Router](app-router)、[Pages Router](pages-router)
- データベースそのものをテーブル、リスト、ギャラリー、カレンダーで表示する：[データベースビュー](database-views)
- 完成したプロジェクトを見る：[サンプル](examples)
