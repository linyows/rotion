# キャッシュ

数百ページのサイトを作ると、Notion API へのリクエストは数千回になります。
一方、API の上限は1つのインテグレーションあたり平均で毎秒3リクエストです。
そのため Rotion はすべてのレスポンスをディスクに保存し、デフォルトでは同じものを Notion に2回問い合わせることはありません。
このページでは、何が保存されるか、いつ取得し直すか、CI でキャッシュをどう引き継ぐかを説明します。

## .cache ディレクトリ

エクスポーターの各呼び出しは、結果を JSON として `.cache` に書き込みます（場所は `ROTION_CACHEDIR` で変えられます）。
ファイル名は呼び出しによって決まります。

| 呼び出し | キャッシュファイル |
|----------|--------------------|
| `FetchDatabase` | `notion.databases.query-<引数のハッシュ>`。`page_size` を指定したときは `.limit-<n>` が付きます |
| `FetchPage` | `notion.pages.retrieve-<ページ ID>` |
| `FetchBlocks` | `notion.blocks.children.list-<ブロック ID>`。子を持つブロックごとに1ファイルです |
| そのほかの問い合わせ | `notion.pages.properties.retrieve-…`、`notion.databases.retrieve-…`、`notion.blocks.retrieve-…` |

「そのほかの問い合わせ」は、Rotion が途中で行うリクエストです。
`FetchPage` のためのプロパティ値、子データベースのブロックとメンションのためのデータベース、パンくずリストのためのページの親がこれにあたります。
これらのファイルは、主要な3つの呼び出しと違い、インクリメンタルキャッシュの有無にかかわらず `ROTION_CACHE_AVAILABLE_DURATION`（デフォルトは2分）より新しいあいだだけ使われます。
リクエストするのは、それを必要とする結果を取得するときだけです。
そのため、自分のキャッシュファイルから返る `FetchPage` はこれらに触れませんが、`FetchBreadcrumbs` を直接呼ぶと問い合わせが発生します。

キャッシュした JSON には、ダウンロードした画像やファイルのローカルパスも入っています。
キャッシュを読むビルドは、Notion を呼ぶこともダウンロードすることもありません。
`.cache/locks` には、並列に動くビルドのワーカーが同じページを同時に取得しないためのロックファイルが置かれます。

## デフォルト：すべてを再利用する

特に設定しなければ、`FetchDatabase`、`FetchPage`、`FetchBlocks` はキャッシュファイルがあれば常にそれを返します。
キャッシュがそろえば、これらの呼び出しはリクエストを送りません。
ただし、Notion で編集しても、該当するファイルか `.cache` 全体を削除するまで反映されません。

```bash
rm -rf .cache
```

この動作は、変更がまれなサイトや、どのみち空のキャッシュからビルドする環境に向いています。

## インクリメンタルキャッシュ [#incremental-cache]

`ROTION_INCREMENTAL_CACHE=true` を指定すると、Rotion は変わった可能性のあるものだけを取得し直します。

- **データベース**：キャッシュしたクエリは、キャッシュファイルの更新時刻から `ROTION_CACHE_AVAILABLE_DURATION` ミリ秒（デフォルトは120000、2分）が経つまで再利用します。それを過ぎるとクエリを送り直します。1回のビルドでは多くのページから `FetchDatabase` を呼びますが、これによりクエリはデータベースごとに1回で済みます。
- **ページとブロック**：`FetchPage` と `FetchBlocks` は、渡された `last_edited_time` とキャッシュに保存された値を比べます。等しければキャッシュを使い、異なれば取得し直します。

`last_edited_time` を渡さなければ比べるものがないので、デフォルトと同じくキャッシュを使います。
インクリメンタルキャッシュを機能させるには、この値を渡す必要があります。

```ts
import { FetchBlocks, FetchDatabase, FetchPage } from 'rotion'

// Rows of a database carry their last_edited_time
const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })
for (const page of db.results) {
  await FetchBlocks({ block_id: page.id, last_edited_time: page.last_edited_time })
}

// A single page: 'force' never matches the cache, so the page is always requested,
// and its current last_edited_time decides whether the blocks are fetched
const page = await FetchPage({ page_id: 'YOUR_PAGE_ID', last_edited_time: 'force' })
const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID', last_edited_time: page.last_edited_time })
```

渡すのはブロックの値ではなく、ページの `last_edited_time` です。
トグル、カラム、リストの項目、同期ブロックの中のブロックを編集すると、Notion はページの `last_edited_time` を更新しますが、親のブロックの値は更新しません。
Rotion は受け取った値をネストしたブロックにも引き継ぐので、変更のあったページでは、ネストしたブロックも取得し直します。

> [!WARNING]
>
> `'force'` は `FetchPage` にだけ使ってください。
> `FetchBlocks` は渡された値をキャッシュに保存します。
> そのため `'force'` を渡した `FetchBlocks` は、一度は取得し直しますが、次のビルドでは自分が保存した `'force'` と一致してしまいます。

## レート制限とリトライ [#rate-limits-and-retries]

Notion へのリクエストは、すべてリトライの仕組みを通ります。
API が `rate_limited`、`internal_server_error`、`service_overload`、`service_unavailable`、`gateway_timeout` を返したとき、または Notion クライアントが想定外のレスポンスやタイムアウトを報告したとき、Rotion は警告を出し、`ROTION_LIMITED_WAITTIME` ミリ秒（デフォルトは60000、1分）待ってから再試行します。
試行は合計で最大3回です。
ページが見つからない、フィルタが不正といったそれ以外のエラーは、API が返した理由を付けてすぐに投げます。

`ROTION_WAITTIME` は、成功したリクエストのたびにミリ秒単位の待ち時間を入れます（デフォルトは0）。
`350` のような値にすると、キャッシュのない状態からのビルドでも、リトライに頼らずに平均毎秒3リクエストの上限の内に収まります。

## 画像とファイルのダウンロード

Notion のファイルの URL は1時間ほどで失効します。
そのため Rotion はファイルそのものを保存し、キャッシュする JSON にはローカルパスを書き込みます。

- **画像**（画像ブロック、ページとデータベースのカバーとアイコン、コールアウトのアイコン、アバター、ブックマークの画像）は `<ROTION_DOCROOT>/<ROTION_IMAGEDIR>`、デフォルトでは `public/images` に保存します。返される `src` は `/images/block-<id>-<hash>.webp` のような、ドキュメントルートからのパスです。
- **ファイル**（ファイル、PDF、アップロードされた動画のブロック）は `<ROTION_DOCROOT>/<ROTION_FILEDIR>`、デフォルトでは `public/files` に保存し、変換はしません。

画像は品質 `ROTION_WEBP_QUALITY`（デフォルトは95）で WebP に変換し、EXIF の向きに合わせて回転します。
GIF、SVG、ICO と、もともと WebP の画像はそのままにします。
HEIC と HEIF の画像は、先に PNG に変換します。
`ROTION_WEBP_QUALITY=0` にすると WebP への変換を行いません（HEIC と HEIF は PNG になります）。

ディスクにすでにあるファイルはダウンロードし直しません。
ローカルのファイル名は、そのファイルが属するブロックやページの ID と、URL の中のファイル名のハッシュから作ります。
そのため、画像を別の名前のファイルに差し替えると新しいものをダウンロードしますが、同じ名前のファイルに差し替えた場合は、古いファイルを削除するまで古いものが使われます。
参照されなくなったファイルは削除しません。

Rotion が自分で行う HTTP リクエスト（ダウンロードと、ブックマークや埋め込みのメタデータを得るためのページの取得）は、`ROTION_UA` を User-Agent として送ります。
接続が `ROTION_TIMEOUT` ミリ秒（デフォルトは1500）無通信になると打ち切り、リダイレクトは `ROTION_MAX_REDIRECTS` 回（デフォルトは5）までたどります。
保存するのは、成功（2xx）のレスポンスだけです。
ダウンロードに失敗したブロックはローカルの `src` を持たないまま残ります。
詳しくは[取得に失敗したとき](#failed-requests)を参照してください。

`ROTION_SKIP_DOWNLOAD=true` にすると、画像をダウンロードせずにパスだけを返します。
これは Rotion 自身のテストのための設定です。

## 取得に失敗したとき [#failed-requests]

ページの中の一部の取得に失敗しても、ビルドは止まりません。
Rotion は失敗ごとに1行を標準エラー出力に出し、その部分を欠いたまま進みます。
たとえば画像はローカルの `src` を持たず、メンションは `--` と表示され、ネストしたブロックは子を持ちません。

```
[rotion] failed to get image of block 1a2b...: saveImage download error -- path: public/images/block-1a2b....png, url: https://..., message: HTTPStatusError: unexpected status 503: https://...
[rotion] not caching the blocks of 9f8e... because of a transient failure; they are fetched again on the next call
```

その結果をキャッシュするかどうかは、失敗の種類で決まります。

- **一時的な失敗**：リトライしても解消しなかったレート制限やサーバーエラー、タイムアウト、ネットワークのエラー、ダウンロードでの HTTP 5xx、408、429 です。結果はキャッシュせず、次のビルド（またはリクエスト）で取得し直します。ネストしたブロックでの失敗は、それを含むページもキャッシュしません。キャッシュしなかった結果ごとに、`not caching ...` の行を出します。
- **恒久的な失敗**：削除された画像のような HTTP 4xx や、インテグレーションがアクセスできないページやデータベースです。何度試しても同じように失敗するので、その部分を欠いたまま結果をキャッシュします。

ブックマークのメタデータ、埋め込み、動画の埋め込み、GitHub のリンクプレビューは、外部のサイトから取得します。
これらの失敗も出力しますが、キャッシュを止めることはありません。

`ROTION_STRICT=true` にすると、失敗したときにビルドを止めます。
外部のサイトからの取得を除き、最初の失敗をエラーとして投げ、そのページは何もキャッシュしません。
画像が欠けたサイトを公開したくない CI で使います。

`ROTION_DEBUG=true` にすると、各行のあとに、失敗した Notion リクエストの引数を含むエラーの全体を出します。

## CI でのキャッシュの引き継ぎ

CI では、実行のたびに空のチェックアウトから始まります。
`.cache` と `public/images`、`public/files` を復元すれば、全件の取得がインクリメンタルな取得になります。
3つは必ずまとめて復元してください。
キャッシュした JSON は画像のパスを指しており、キャッシュが使われると画像はダウンロードし直されないからです。

次のワークフローは、Rotion 自身のサイトを GitHub Actions でビルドしているものをもとにしています。

```yaml filename=".github/workflows/pages.yml"
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
      ROTION_INCREMENTAL_CACHE: 'true'
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm
      - name: Restore rotion cache
        uses: actions/cache@v4
        with:
          path: |
            .cache
            public/images
            public/files
          key: rotion-${{ github.run_id }}
          restore-keys: rotion-
      - run: npm ci
      - run: npm run build
```

`actions/cache` は、既存のキーを上書きしません。
キーを固定すると、最初の実行で保存したキャッシュが復元され続け、新しくダウンロードしたものは保存されません。
そのためキーに実行 ID を含め、`restore-keys` で直前のキャッシュを拾います。
