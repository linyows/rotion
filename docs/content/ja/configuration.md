# 設定

Rotion の設定は環境変数だけで行います。
変数は `rotion` が最初に import された時点で一度だけ読まれます。
そのため、ビルドのプロセスが始まる前に設定しておきます。
Next.js なら `.env.local`、CI ならジョブの環境、あるいはコマンドラインで指定します。

```bash
NOTION_TOKEN=ntn_xxx ROTION_INCREMENTAL_CACHE=true npm run build
```

## 環境変数

| 名前 | デフォルト | 説明 |
|------|------------|------|
| `NOTION_TOKEN` | なし（**必須**） | Notion インテグレーションのシークレット。すべての API リクエストで使います。 |
| `GOOGLEMAP_KEY` | なし | Google Maps Embed API のキー。埋め込みブロックの Google マップのリンクを地図にするのに必要です。ないと地図は埋め込まれません。 |
| `ROTION_CACHEDIR` | `.cache` | API のレスポンスのキャッシュとロックファイルを置くディレクトリ。 |
| `ROTION_INCREMENTAL_CACHE` | `false` | `true` にすると、データベースは `ROTION_CACHE_AVAILABLE_DURATION` を過ぎたら、ページとブロックは渡した `last_edited_time` がキャッシュの値と異なるときに取得し直します。それ以外のときは既存のキャッシュを常に使います。[キャッシュ](caching#incremental-cache)を参照してください。 |
| `ROTION_CACHE_AVAILABLE_DURATION` | `120000`（ミリ秒、2分） | インクリメンタルキャッシュが有効なとき、キャッシュしたデータベースのクエリを使い続ける時間。プロパティ値、データベース、パンくずリストのためにキャッシュした問い合わせを使い続ける時間でもあり、こちらはモードにかかわらず適用されます。 |
| `ROTION_DOCROOT` | `public` | サイトのルートとして配信するディレクトリ。ダウンロードした画像とファイルはこの下に置きます。 |
| `ROTION_IMAGEDIR` | `images` | 画像のディレクトリ。`ROTION_DOCROOT` からの相対パスです。データの中の画像のパスの先頭（`/images/...`）にもなります。 |
| `ROTION_FILEDIR` | `files` | ファイル、PDF、動画のディレクトリ。`ROTION_DOCROOT` からの相対パスです。それらのパスの先頭（`/files/...`）にもなります。 |
| `ROTION_WEBP_QUALITY` | `95` | ダウンロードした画像から変換する WebP の品質（1〜100）。`0` にすると変換しません。 |
| `ROTION_WAITTIME` | `0`（ミリ秒） | Notion API へのリクエストが成功するたびに入れる待ち時間。 |
| `ROTION_LIMITED_WAITTIME` | `60000`（ミリ秒、1分） | レート制限、サーバーエラー、タイムアウトで失敗したリクエストを再試行する前の待ち時間。試行は最大3回です。 |
| `ROTION_TIMEOUT` | `1500`（ミリ秒） | Rotion が自分で行う HTTP リクエスト（ファイルのダウンロードと、ブックマークや埋め込みのためのページの取得）の無通信タイムアウト。Notion API へのリクエストには使いません。 |
| `ROTION_MAX_REDIRECTS` | `5` | それらの HTTP リクエストでたどるリダイレクトの最大回数。 |
| `ROTION_UA` | カレントディレクトリの `package.json` の `<name>/<version>` | それらの HTTP リクエストの `User-Agent` ヘッダ。これによって返す内容を変えるサイトもあります。Rotion 自身のサイトは `ROTION_UA=curl` でビルドしています。 |
| `ROTION_SKIP_QUERY_VALIDATION` | `false` | `true` にすると、データベースのクエリをフィルタとソートの照合なしで送ります。[validateQuery](api#validatequery) を参照してください。 |
| `ROTION_STRICT` | `false` | `true` にすると、画像などページの一部の取得に失敗したとき、警告を出して省く代わりに例外を投げます。外部のサイトからの取得（ブックマーク、埋め込み、リンクプレビュー）は警告だけです。[取得に失敗したとき](caching#failed-requests)を参照してください。 |
| `ROTION_DEBUG` | `false` | `true` にすると、キャッシュの判断とロックの動作をログに出し、各警告のあとにエラーの全体を出し、Notion クライアントのログレベルを debug にします。失敗の警告は、これがなくても出ます。 |
| `ROTION_SKIP_DOWNLOAD` | `false` | `true` にすると、画像をダウンロードせずにパスだけを返します。Rotion のテスト用です。 |

真偽値の変数は、文字列 `true` と完全に一致するときだけ有効になります。
数値は整数として解釈します。

> [!NOTE]
>
> Rotion は import された時点で、`ROTION_UA` のデフォルト値のためにカレントディレクトリの `package.json` を読みます。
> ビルドは `package.json` のあるプロジェクトのルートで実行してください。

`ROTION_CACHEDIR` と `ROTION_DOCROOT` のパスも、カレントディレクトリからの相対パスです。

## サンプルで使う変数

このドキュメントと[サンプル](examples)で使っている `NOTION_DATABASE_ID` は、Rotion が読む変数ではありません。
サンプルのコードがこれを読み、`FetchDatabase` に渡しています。
