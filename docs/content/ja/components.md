# コンポーネント

このページのものは、すべて `rotion/ui` から import します。
コンポーネントは [API リファレンス](api)の関数が返したオブジェクトを受け取って描画するだけで、自分では何も取得しません。

```tsx
import { Page, Table, List, Gallery, Calendar } from 'rotion/ui'
```

`rotion/ui` のモジュールには、すべて `'use client'` が付いています。
Next.js App Router でも、サーバーコンポーネントからこれらを描画し、取得したデータを props として渡せます。
データがただの JSON だからです。
ただし `link` のような関数のプロパティにはクライアント参照が必要です。
[createClientLink](#createclientlink) を参照してください。

## Page

Notion のページの本文を描画します。

```tsx
const blocks = await FetchBlocks({ block_id: pageId })

<Page blocks={blocks} />
```

| プロパティ | 型 | 説明 |
|------------|----|------|
| `blocks` | `ListBlockChildrenResponseEx` | `FetchBlocks` の戻り値。必須です。 |
| `href` | `string` | 子ページと子データベースへのリンクのパスのパターン。`'/[id]'` なら `/` にページやデータベースの ID を続けたパスへ、`'/[title]'` のように角括弧の中がそれ以外のキーなら、`/` にタイトルを続けたパスへリンクします。タイトルは小文字にして URL エンコードし、空白を `-` に置き換えます。`href` がなければリンクにしません。 |
| `link` | `Link` | これらのリンクに `<a>` の代わりに使うコンポーネント。 |
| `query` | `ParsedUrlQueryInput` | 子データベースとパンくずリストの要素へのリンクに加えるクエリパラメータ。 |
| `breadcrumb_hrefs` | `string[]` | パンくずリストのブロックの各要素のパス。要素ごとに1つで、形式は [Breadcrumbs](#breadcrumbs) の `hrefs` と同じです。 |

連続するリストの項目は、1つの `<ul>` や `<ol>` にまとめます。
見出しにはブロック ID の末尾8文字から作った `id` を付けます。
[TableOfContents](#tableofcontents) はこの `id` にリンクします。
Rotion が描画しない種類のブロックは表示されません。
ショーケースにはブロックの種類ごとのページがあり、[段落](blocks/paragraph)から始まります。

コードブロックは、ブラウザで [Prism](https://prismjs.com) によってハイライトします。
言語の定義とテーマ（`prism.min.css`、システムがダークモードなら `prism-tomorrow.min.css`）は、ページの実行時に `unpkg.com` から読み込みます。
このテーマは、`style-without-dark.css` を使っていてもシステムの設定に従います。
言語が `mermaid` のコードブロックは、[Mermaid](https://mermaid.js.org) の図として描画します。

## データベースビュー

`Table`、`List`、`Gallery`、`Calendar` は `FetchDatabase` の結果を描画します。
プロパティとオプションは[データベースビュー](database-views)で説明しています。

| コンポーネント | プロパティ |
|----------------|------------|
| `Table` | `db`、`keys`、`options?: TableOptions` |
| `List` | `db`、`keys`、`options?: ListOptions` |
| `Gallery` | `db`、`keys`、`options?: GalleryOptions` |
| `Calendar` | `db`、`keys`、`date`、`options?: CalendarOptions` |

## Breadcrumbs

`FetchBreadcrumbs` の結果を、`/` で区切ったリンクの並びとして描画します。

```tsx
const list = await FetchBreadcrumbs({ type: 'page_id', id: pageId })

<Breadcrumbs list={list} hrefs={['/', '/[id]', '/[id]']} />
```

| プロパティ | 型 | 説明 |
|------------|----|------|
| `list` | `Breadcrumb[]` | `FetchBreadcrumbs` の戻り値。 |
| `hrefs` | `string[]` | 要素ごとのパスを同じ順に並べたもの。`'/'` はそのまま使います。`'/[id]'` は `/` に要素の ID を続けたパスに、角括弧の中がそれ以外のキーなら `/` に要素の名前を続けたパスになります。名前は小文字にして URL エンコードし、空白を `-` に置き換えます。パスのない要素はリンクになりません。 |
| `link` | `Link` | リンクに `<a>` の代わりに使うコンポーネント。 |
| `query` | `ParsedUrlQueryInput` | リンクに加えるクエリパラメータ。 |

ページの中のパンくずリストのブロックも、同じコンポーネントで描画します。
そのパスは、`<Page>` に `breadcrumb_hrefs` として渡します。

## TableOfContents

ページの最上位のブロックにある見出しから、入れ子のリンクのリストを作ります。

```tsx
<TableOfContents blocks={blocks} />
```

| プロパティ | 型 | 説明 |
|------------|----|------|
| `blocks` | `ListBlockChildrenResponseEx` | `FetchBlocks` の戻り値。 |

各リンクは、`<Page>` が見出しに付けた `id` を `#` のあとに続けたものを指します。
サイドバーなど、本文の外に目次を置くときに使います。
Notion で書いた目次ブロックは `<Page>` が描画します。
[目次](blocks/table-of-contents)を参照してください。

`GenHtmlId(blockId)` は、`<Page>` が見出しに付ける `id` を返します。
独自のナビゲーションを作るときに使えます。

## RichText

リッチテキストの1項目を描画します。
注釈（太字、斜体、取り消し線、下線、コード、色）、リンク、メンション、インラインの数式を扱います。

```tsx
{title.map((item, i) => <RichText key={i} textObject={item} />)}
```

| プロパティ | 型 | 説明 |
|------------|----|------|
| `textObject` | `RichTextItemResponse` | `rich_text` や `title` の配列の1要素。 |

## Icon

Rotion が内部で使う SVG アイコンを1つ描画します。

| プロパティ | 型 | 説明 |
|------------|----|------|
| `name` | `'figma' \| 'slack' \| 'github' \| 'file' \| 'link' \| 'codemerge' \| 'circlecheck' \| 'circledot' \| 'downloadfile'` | アイコンの種類。 |
| `width`、`height` | `string` | `'20px'` のような大きさ。デフォルトはアイコンごとに異なります。 |
| `className` | `string` | 追加するクラス名。 |

## Checkbox

Notion のチェックボックスプロパティと同じ見た目の、チェックの入った箱または空の箱を描画します。

| プロパティ | 型 | 説明 |
|------------|----|------|
| `bool` | `boolean` | チェックが入っているかどうか。 |

## createClientLink

```ts
function createClientLink<T extends ComponentType<any>>(LinkComponent: T): FC<ComponentProps<T>>
```

`next/link` などのリンクのコンポーネントを、同じ props でそれを描画する新しい関数コンポーネントで包みます。
`'use client'` を付けたファイルで呼び、結果を export します。
これで、サーバーコンポーネントからも `link` として渡せるようになります。

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

Pages Router など、サーバーコンポーネントのない構成では、`next/link`（または互換のコンポーネント）をそのまま渡せます。

## Link

```ts
interface Link extends React.FC<{
  children: string | React.ReactNode
  className?: string
  href: string | UrlObject
}> {}
```

すべての `link` プロパティの型です。
Rotion はこれを `className`、`children`、`href` を付けて呼びます。
`href` はパスか、`query` を指定したときは `{ pathname, query }` です。
`next/link` はこの形に合います。
TypeScript がそのままでは受け付けない箇所では `as Link` でキャストします。

## そのほかの export

`rotion/ui` は、ブロックの種類ごとのコンポーネント（`TextBlock`、`ImageBlock`、`CodeBlock`、`CalloutBlock` など）と、ビューのプロパティごとのフィールド（`TableTitleField`、`GalleryCard`、`ListDateField` など）も export しています。
`<Page>` とビューが内部で使うものですが、ブロックやフィールドを1つだけ描画したいときのために公開されています。

ヘルパー関数のうち `BuildPlainTextByPage(blocks)` は、ページの最上位の段落のプレーンテキストを返します。
メタディスクリプションを作るのに使えます。

## テーマ [#theming]

スタイルシート（`rotion/style.css` または `rotion/style-without-dark.css`）は、色、フォント、罫線を `:root` の CSS カスタムプロパティとして定義しています。
名前はすべて `--rotion-` で始まります。
スタイルシートを import したあとで上書きします。

```css filename="app/globals.css"
:root {
  --rotion-font-family: 'Inter', sans-serif;
  --rotion-primary-text: rgb(20, 20, 20);
  --rotion-link-color: rgb(0, 102, 204);
  --rotion-border-radius: 6px;
}
```

主な変数は次のとおりです。

| 分類 | 例 |
|------|----|
| 基本 | `--rotion-font-family`、`--rotion-border-radius`、`--rotion-line-height` |
| 文字 | `--rotion-primary-text`、`--rotion-secondary-text`、`--rotion-tertiary-text` |
| 罫線 | `--rotion-border-color`、`--rotion-border`、`--rotion-border-hover` |
| コード、テーブル、トグル、引用 | `--rotion-code-bg-color`、`--rotion-table-header-bg-color`、`--rotion-toggle-hover-bg-color`、`--rotion-quote-border-color` |
| リンク | `--rotion-link-color`、`--rotion-link-hover-color`、`--rotion-link-border-bottom`、`--rotion-link-hover-bg-color` |
| Notion の文字色と背景色 | `--rotion-annot-<color>`、`--rotion-annot-bg-<color>`。色は `default`、`gray`、`brown`、`orange`、`yellow`、`green`、`blue`、`purple`、`pink`、`red` |
| セレクトとマルチセレクトのタグ | `--rotion-tag-<color>`、`--rotion-tag-bg-<color>`。色は同上 |
| ギャラリー | `--rotion-gallery-box-shadow`、`--rotion-gallery-bg`、`--rotion-gallery-grid-template-columns-small` / `-medium` / `-large` |
| リストビュー | `--rotion-list-min-width` |
| テーブルビュー | `--rotion-table-border`、`--rotion-table-icon-fill` |
| カレンダー | `--rotion-calendar-weekend-bg` |

コンポーネントが出力するクラス名はすべて `rotion-` で始まるので、要素を直接指定することもできます。

### ダークモード

色の変数の多くには、`--rotion-primary-text` に対する `--rotion-dark-primary-text` のように、`-dark-` を含む名前のダーク版があります。
`rotion/style.css` は `@media (prefers-color-scheme: dark)` の中でダーク版の変数に切り替えるので、コンポーネントは OS の設定に従います。
ダークモードの色を変えるには、`--rotion-dark-*` の変数を上書きします。

`rotion/style-without-dark.css` は、同じソースからこのメディアクエリを除いてビルドしたもので、コンポーネントは常にライトの変数を使います。
サイトにダークテーマがない場合や、ほかの方法でテーマを切り替える場合に使います。
後者では、`html.dark` のような独自のセレクタの下で、ライトの変数にダークモードの色を設定します。
