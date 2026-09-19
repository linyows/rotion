# API リファレンス

このページのものは、すべて `rotion` から import します。
これらの関数はビルド時に Node.js で動き、`NOTION_TOKEN` をはじめとする[設定](configuration)の変数を、モジュールが読み込まれた時点で読みます。

```ts
import { FetchDatabase, FetchPage, FetchBlocks, FetchBreadcrumbs } from 'rotion'
```

取得の関数はどれも、結果を `.cache` にキャッシュし、ファイルを `public/` にダウンロードします。
キャッシュした結果をいつ使うかは[キャッシュ](caching)で説明しています。
失敗した Notion へのリクエストは[キャッシュ](caching#rate-limits-and-retries)で説明したとおりに再試行し、それでも失敗すれば `Error` を投げます。
メッセージには API のメソッド、Notion が返したエラーコードとメッセージ、引数が含まれ、元のエラーは `cause` に入ります。

## FetchDatabase

```ts
function FetchDatabase(args: FetchDatabaseArgs): Promise<FetchDatabaseRes>

interface FetchDatabaseArgs extends Omit<QueryDataSourceParameters, 'data_source_id'> {
  database_id: string
}
```

データベースに問い合わせ、条件に合うすべてのページを返します。

`args` は、`database_id` と、Notion API のデータソースのクエリのパラメータ（`filter`、`sorts`、`page_size` など）です。
Rotion はデータベースを取得してその最初のデータソースに問い合わせ、`next_cursor` をたどって全ページを取得します。
`page_size` を指定したときは、結果の最初の1ページだけを取得します。

クエリの前に、`filter` と `sorts` をデータベースのプロパティと [`validateQuery`](#validatequery) で照合します。
問題が見つかれば、クエリを送らずにエラーを投げます。
`ROTION_SKIP_QUERY_VALIDATION=true` でこの照合を省けます。
データベースにデータソースがない場合もエラーを投げます。

結果の `FetchDatabaseRes`（`QueryDatabaseResponseEx` と同じ形）は、クエリのレスポンスに次を加えたものです。

| フィールド | 説明 |
|------------|------|
| `results` | `PageObjectResponseEx[]`。すべてのページです。`cover.src` と `icon.src` にダウンロードしたファイルが、ユーザープロパティの各ユーザーに `avatar` が設定されます。 |
| `meta` | `GetDatabaseResponseEx`。データベース自体で、`properties`（データソースのプロパティ定義）と `cover.src`、`icon.src` を持ちます。 |

Notion の組み込みアイコン（`icon.type === 'icon'`）は SVG としてダウンロードし、`src` を持つ `external` のアイコンに置き換えます。

## FetchPage

```ts
function FetchPage(args: FetchPageArgs): Promise<FetchPageRes>

interface FetchPageArgs {
  page_id: string
  last_edited_time?: string
}
```

ページとそのプロパティの値を取得します。

結果の `FetchPageRes`（`GetPageResponseEx`）は、ページのオブジェクトに次を加えたものです。

| フィールド | 説明 |
|------------|------|
| `meta` | プロパティ API から1つずつ取得した値を、1つのリストのレスポンスにまとめたものです。`meta.object === 'list'` で、`meta.results` に項目が入ります。含まれるのは、API がリストとして返すプロパティ（タイトル、リッチテキスト、リレーション、ユーザー、ロールアップ）だけで、区切りや要素ごとに1項目です。それ以外の値は、通常のページオブジェクトと同じく `properties` にあります。 |
| `cover.src`、`icon.src` | ダウンロードしたカバーとアイコンのローカルパス。 |

`last_edited_time` を使うのはインクリメンタルキャッシュが有効なときだけです。
キャッシュしたページの `last_edited_time` と等しければ、キャッシュを返します。
`'force'` は一致することがないので、常にページを取得します。
`last_edited_time` を渡さなければ、常にキャッシュを返します。

## FetchBlocks

```ts
function FetchBlocks(args: FetchBlocksArgs): Promise<FetchBlocksRes>

interface FetchBlocksArgs {
  block_id: string
  last_edited_time?: string
}
```

ページの本文（または任意のブロックの子）と、その描画に必要なものをすべて取得します。
結果は [`<Page>`](components#page) に渡します。

結果の `FetchBlocksRes`（`ListBlockChildrenResponseEx`）は子ブロックのリストで、すべてのページの結果を `results` にまとめています。
`last_edited_time` を渡すと、その値を結果の `last_edited_time` として保存し、インクリメンタルキャッシュが有効なら次の呼び出しで比較します。
渡すのはページの値で、`'force'` は渡さないでください（[キャッシュ](caching#incremental-cache)を参照）。

Rotion はブロックに次のフィールドを加えます。

| ブロックの種類 | 加えるフィールド |
|----------------|------------------|
| `bulleted_list_item`、`numbered_list_item`、`callout`、`toggle`、`table`、`synced_block` | `children`：`FetchBlocks` で取得したネストしたブロック。コピー側の同期ブロックは、元のブロックの子を取得します。 |
| `column_list` | `children`（カラム）と `columns`（カラムごとのブロックのリスト）。 |
| `child_page` | `page`：`FetchPage` で取得した子ページ。 |
| `child_database` | `database`：データベースのオブジェクト。 |
| `breadcrumb` | `list`：`FetchBreadcrumbs` で取得したページのパンくずリスト。 |
| `image` | `image.src`、`image.width`、`image.height`：ダウンロードした画像とその大きさ。 |
| `file`、`pdf` | ダウンロードしたファイルの `src` と `size`（バイト）。 |
| `video` | アップロードされた動画なら `video.src` と `video.videoType`、外部の動画なら埋め込みコードの `video.html`。 |
| `bookmark` | `bookmark.site`：リンク先のページから読み取った `title`、`desc`、`image`、`icon`。 |
| `embed` | `embed.html`：対応するサービスの埋め込みコード。Google マップには `GOOGLEMAP_KEY` が必要です。 |
| `link_preview` | `link_preview.github`（Issue、プルリクエスト、リポジトリの情報）または `link_preview.figma`（埋め込みコード）。 |
| `callout` | 外部の画像や組み込みアイコンのとき、`callout.icon.src`。 |
| `paragraph` | ページとデータベースのメンションに `name` と `icon`。 |

1つのブロックの解決（ダウンロードやメタデータの取得など）に失敗しても、そのブロックは追加のフィールドなしで描画され、処理は続きます。

## FetchBreadcrumbs

```ts
function FetchBreadcrumbs(props: FetchBreadcrumbsProps): Promise<Breadcrumb[]>

interface FetchBreadcrumbsProps {
  type: 'page_id' | 'database_id' | 'block_id' | 'workspace' | 'data_source_id' | 'agent_id'
  id: string
  limit?: number
}

type Breadcrumb = {
  id: string
  name: string
  icon?: MentionIcon
}
```

ページ、データベース、ブロックの親をたどり、上から順に返します。
対象がページかデータベースなら、最後の要素はそれ自身です。
`limit`（デフォルトは5）は要素数の上限です。
たどるのはワークスペースか、データベースの行の親であるデータソースに着くまでです。
エラーが起きるとそこで止まり、それまでに集めたものを返します。
アイコンはダウンロードします。
絵文字のアイコンは `emoji` を、それ以外のアイコンは `src` を持ちます。

```ts
const breadcrumbs = await FetchBreadcrumbs({ type: 'page_id', id: 'YOUR_PAGE_ID' })
```

結果は [`<Breadcrumbs>`](components#breadcrumbs) で描画します。

## validateQuery

```ts
function validateQuery(args: ValidateQueryArgs): string[]

interface ValidateQueryArgs {
  properties?: QueryProperties
  filter?: unknown
  sorts?: unknown
}

type QueryProperties = Record<string, DatabasePropertyConfigResponse>
```

データベースへのクエリをプロパティの定義と照合し、問題ごとに1つのメッセージを返します。
空の配列が返れば、問題は見つかっていません。
`FetchDatabase` はクエリのたびにこれを呼びます。
検出するのは次の問題です。

- 存在しないプロパティを指定したフィルタやソート（プロパティ名のほか、プロパティ ID も受け付けます）
- プロパティの型に合わない条件（`multi_select` のプロパティに `select` を使うなど）
- `equals`、`does_not_equal`、`contains`、`does_not_contain` の値が、セレクト、マルチセレクト、ステータスのプロパティの選択肢にない
- 配列でない `and` や `or`、`property` のないフィルタ、`property` も `timestamp` もないソート

タイムスタンプのフィルタとソートは照合しません。
`properties` が空か未指定なら、何も照合しません。

```ts
function buildQueryValidationMessage(target: string, errors: string[]): string
```

`validateQuery` のメッセージを、`FetchDatabase` が投げるエラーの文面に整形します。

## 下位のヘルパー関数

取得の関数が内部で使うために公開されているもので、直接使うことはあまりありません。
どれも画像をダウンロードし、渡したオブジェクトに `src` を設定します。
ダウンロードの失敗は無視します。

| 関数 | 説明 |
|------|------|
| `savePageCover(page)` | ページのカバーをダウンロードします。 |
| `savePageIcon(page)` | ページのアイコンをダウンロードします。Notion の組み込みアイコンは `external` のアイコンに置き換えます。 |
| `saveDatabaseCover(db)` | データベースのカバーをダウンロードします。 |
| `saveDatabaseIcon(db)` | データベースのアイコンを、`savePageIcon` と同じようにダウンロードします。 |
| `getNotionIconUrl(icon)` | `name` と `color` から、Notion の組み込みアイコンの SVG の URL を返します。 |

## 型

`rotion` は、Notion SDK の API エンドポイントの型（`RichTextItemResponse`、`PageObjectResponse`、`TitlePropertyItemObjectResponse`、`QueryDataSourceParameters` など）をすべて再エクスポートし、Rotion が拡張した型もあわせて公開しています。
よく使うのは次の型です。

| 型 | 説明 |
|----|------|
| `QueryDatabaseResponseEx` | `FetchDatabase` の戻り値。データベースビューの `db` プロパティの型です。 |
| `PageObjectResponseEx` | `QueryDatabaseResponseEx['results']` の1行。 |
| `GetDatabaseResponseEx` | ダウンロードしたカバーとアイコン、`properties` を持つデータベース。 |
| `GetPageResponseEx` | `FetchPage` の戻り値。 |
| `ListBlockChildrenResponseEx` | `FetchBlocks` の戻り値。`<Page>` の `blocks` プロパティの型です。 |
| `BlockObjectResponse` | Rotion が加えたフィールドを含む1つのブロック。 |
| `Breadcrumb` | `FetchBreadcrumbs` の結果の1要素。 |
| `DatabaseProperty` | データベースの行のプロパティ値。 |
