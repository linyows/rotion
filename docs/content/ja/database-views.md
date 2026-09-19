# データベースビュー

Notion のデータベースは `FetchDatabase` で取得し、`Table`、`List`、`Gallery`、`Calendar` の4つのコンポーネントのいずれかで表示します。
それぞれの表示例はショーケースのページにあります。
[Table](views/table)、[List](views/list)、[Gallery](views/gallery)、[Calendar](views/calendar) を参照してください。

## データベースの取得

```ts
import { FetchDatabase } from 'rotion'

const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })
```

`FetchDatabase` は、データベース ID に加えて、Notion API の[データソースのクエリ](https://developers.notion.com/reference/query-a-data-source)の引数を受け取ります。
ただし `data_source_id` は Rotion が補います。
Rotion はデータベースを取得し、その最初のデータソースに対してクエリを実行します。
結果はすべてのページを取得して `db.results` にまとめます。
データベース自体の情報（タイトル、アイコン、カバー、プロパティの定義）は `db.meta` に入ります。

フィルタとソートは Notion API の形式で書きます。

```ts
const db = await FetchDatabase({
  database_id: 'YOUR_DATABASE_ID',
  filter: {
    and: [
      { property: 'Published', checkbox: { equals: true } },
      { property: 'Tags', multi_select: { contains: 'Release' } },
    ],
  },
  sorts: [
    { property: 'Date', direction: 'descending' },
  ],
})
```

Rotion は、クエリを送る前にフィルタとソートをデータベースのプロパティと照合します。
存在しないプロパティ名、プロパティの型に合わない条件（`multi_select` のプロパティに `select` を使うなど）、セレクト、マルチセレクト、ステータスのプロパティにない選択肢名があると、`FetchDatabase` はエラーを投げます。
エラーのメッセージには、問題の箇所と、使えるプロパティや選択肢の一覧が含まれます。
Notion API もこうしたクエリを拒否しますが、そのメッセージからはクエリのどこが誤りなのかがわかりません。
この照合は `ROTION_SKIP_QUERY_VALIDATION=true` で無効にできます。

`page_size` を指定すると、その件数の1ページ分だけを取得します。
このとき Rotion は `next_cursor` をたどりません。

キャッシュファイルは引数の組み合わせごとに作られます。
同じデータベースを2種類のフィルタで取得すれば、キャッシュも2つになります。
キャッシュしたクエリをいつ取得し直すかは[キャッシュ](caching)で説明しています。

クエリと同時に、Rotion は各行のカバーとアイコン、ユーザープロパティのアバター、データベース自体のカバーとアイコンをダウンロードし、ローカルパスを `src` として加えます。

## keys によるプロパティの選択

どのビューも、表示するプロパティの名前を順に並べた `keys` を受け取ります。
データベースにない名前を指定すると、何も表示されません（テーブルでは、見出しだけがあって中身が空の列になります）。
各ビューが描画できるプロパティの種類は次のとおりです。

| プロパティの種類 | Table | List | Gallery | Calendar |
|------------------|:-----:|:----:|:-------:|:--------:|
| `title` | ✓ | ✓ | ✓ | ✓ |
| `rich_text` | ✓ | ✓ | ✓ | ✓ |
| `select` | ✓ | ✓ | ✓ | ✓ |
| `multi_select` | ✓ | ✓ | ✓ | ✓ |
| `date` | ✓ | ✓ | ✓ | |
| `number` | ✓ | ✓ | ✓ | |
| `checkbox` | ✓ | ✓ | ✓ | |
| `url` | ✓ | ✓ | ✓ | |
| `formula`（結果が数値のもの） | ✓ | ✓ | ✓ | |

それ以外の種類のプロパティは描画されません。
数式は、結果が数値のときだけ表示されます。

## リンク：href、link、query

4つのビューは、値をリンクにするための3つのオプションを共通に持っています。

- `href`：プロパティ名からパスへの対応です。
  - **タイトル**プロパティに指定したパスは、その行のリンクになります。パスの中の `[id]` はページ ID に置き換わります（`'/posts/[id]'` → `/posts/1429989f-...`）。角括弧の中がそれ以外の名前なら、その名前の `rich_text` プロパティのテキストに置き換わります。これを使うと、`Slug` プロパティで URL を決められます（`'/posts/[Slug]'`）。角括弧のないパスはそのまま使います。
  - **select** や **multi_select** のプロパティに指定すると、各選択肢が、パスに `/` と URL エンコードした選択肢名を続けたリンクになります（`{ Tags: '/tags' }` → `/tags/Release`）。
- `link`：リンクに `<a>` の代わりに使うコンポーネントです。`next/link` などを渡します。App Router では、`createClientLink` で作ったラッパーを渡します。[App Router](app-router#wrap-nextlink-with-createclientlink) を参照してください。
- `query`：各リンクに加えるクエリパラメータです。`link` に `href={{ pathname, query }}` として渡されます。`link` を指定したときだけ使われます。

```tsx
<Table
  db={db}
  keys={['Title', 'Tags', 'Date']}
  options={{
    href: { Title: '/posts/[Slug]', Tags: '/tags' },
    link: NextLink as Link,
  }}
/>
```

`Table`、`List`、`Gallery` にある `prefix` と `suffix` は、プロパティ名から、値の前後に表示する文字列への対応です。
数値、チェックボックス、数式のプロパティに効き、`{ Price: '$' }` や `{ Duration: 'min' }` のように単位を添えるのに使います。

## Table

```tsx
import { Table } from 'rotion/ui'

<Table db={db} keys={['Title', 'Tags', 'Date']} options={{ verticalLines: false }} />
```

| プロパティ | 型 | 説明 |
|------------|----|------|
| `db` | `QueryDatabaseResponseEx` | `FetchDatabase` の戻り値です。 |
| `keys` | `string[]` | 表示するプロパティで、1つが1列になります。見出しには名前と種類のアイコンを表示します。 |
| `options` | `TableOptions` | 下の表を参照してください。 |

| オプション | 型 | デフォルト | 説明 |
|------------|----|------------|------|
| `href` | `{ [key: string]: string }` | | リンク。上で説明したとおりです。 |
| `link` | `Link` | | リンクのコンポーネント。 |
| `query` | `ParsedUrlQueryInput` | | リンクのクエリパラメータ。 |
| `prefix` | `{ [key: string]: string }` | | 値の前に表示する文字列。 |
| `suffix` | `{ [key: string]: string }` | | 値の後に表示する文字列。 |
| `verticalLines` | `boolean` | `true` | 列のあいだに罫線を引きます。 |

列には `rotion-table-column0`、`rotion-table-column1` のようなクラス名が付くので、CSS で幅を指定できます。

## List

```tsx
import { List } from 'rotion/ui'

<List db={db} keys={['Title', 'spacer', 'Tags', 'Date']} />
```

リストは、ページごとに1行を使い、`keys` の値を横に並べます。
`keys` には、プロパティではない特別な名前を2つ使えます。

- `spacer`：残りの幅を占め、それ以降のキーを右端に寄せます。
- `dashed`：`spacer` と同じ働きをし、空いた部分に破線を引きます。

| プロパティ | 型 | 説明 |
|------------|----|------|
| `db` | `QueryDatabaseResponseEx` | `FetchDatabase` の戻り値です。 |
| `keys` | `string[]` | 表示するプロパティと、`spacer` または `dashed`。 |
| `options` | `ListOptions` | 上で説明した `href`、`link`、`query`、`prefix`、`suffix`。 |

## Gallery

```tsx
import { Gallery } from 'rotion/ui'

<Gallery
  db={db}
  keys={['Title', 'Tags']}
  options={{
    href: { Title: '/posts/[id]' },
    image: { size: 'large', fit: false },
  }}
/>
```

ギャラリーは、ページごとに1枚のカードを表示し、カードの上部にページのカバー画像を置きます。
タイトルプロパティに `href` を指定すると、カード全体がリンクになります。

| プロパティ | 型 | 説明 |
|------------|----|------|
| `db` | `QueryDatabaseResponseEx` | `FetchDatabase` の戻り値です。 |
| `keys` | `string[]` | 各カードに表示するプロパティ。 |
| `options` | `GalleryOptions` | `href`、`link`、`query`、`prefix`、`suffix`、`image`。 |

`image` で、カードとカバー画像の表示を指定します。

| オプション | 型 | デフォルト | 説明 |
|------------|----|------------|------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | カードの大きさ。カードの最小幅はそれぞれ180px、260px、320px で、カバーの高さは100px、146px、180px です。 |
| `fit` | `boolean` | `true` | `true` ならカバー全体を枠の中に収めます（`object-fit: contain`）。`false` なら枠を埋めるように画像を切り抜きます（`object-fit: cover`）。 |
| `preview` | `'cover' \| 'content'` | `'cover'` | 実装されているのは `'cover'` だけです。ページにカバーがあれば、それをカードに表示します。 |

列の幅は CSS 変数 `--rotion-gallery-grid-template-columns-small`、`-medium`、`-large` で決まり、上書きできます。

## Calendar

```tsx
import { Calendar } from 'rotion/ui'

<Calendar
  db={db}
  date="Date"
  keys={['Name', 'Tags']}
  options={{
    initialDate: '2026-04-01',
    weekStart: 'monday',
    locale: 'ja-JP',
    href: { Name: '/events/[id]' },
  }}
/>
```

カレンダーは、日付プロパティの1つを使って、各ページを月ごとのグリッドに配置します。
前後の月と今日の月に移動するボタンがあります。
開始日と終了日の両方がある予定は、期間の日にまたがる1本のバーとして描かれ、週の境目をまたぐときは次の週の行に続きます。
日付プロパティが空のページは表示されません。

| プロパティ | 型 | 説明 |
|------------|----|------|
| `db` | `QueryDatabaseResponseEx` | `FetchDatabase` の戻り値です。 |
| `date` | `string` | 予定の配置に使う日付プロパティの名前。必須です。 |
| `keys` | `string[]` | 各予定の中に表示するプロパティ。タイトルは `keys` に含めなくても常に先頭に表示します。描画されるのは `title`、`rich_text`、`select`、`multi_select` です。 |
| `options` | `CalendarOptions` | 下の表を参照してください。 |

| オプション | 型 | デフォルト | 説明 |
|------------|----|------------|------|
| `initialDate` | `string` | 今日 | 最初に表示する月。`YYYY-MM-DD` か `YYYY-MM` の形式です。 |
| `weekStart` | `'sunday' \| 'monday'` | `'sunday'` | 週の始まりの曜日。 |
| `locale` | `string` | ブラウザの言語 | 月と曜日の表示に使うロケール。 |
| `href` | `{ [key: string]: string }` | | 使われるのはタイトルプロパティの指定だけで、予定全体がリンクになります。 |
| `link` | `Link` | | リンクのコンポーネント。 |
| `query` | `ParsedUrlQueryInput` | | リンクのクエリパラメータ。 |

`initialDate` を指定しないと、カレンダーは描画した日の月から始まります。
静的なページでは、生成された HTML の月はビルドした日のもので、閲覧者の日付とは異なることがあります。
最初に表示する月が重要なら、`initialDate` を指定してください。
日付は暦日として比較し、時刻の部分は無視します。
