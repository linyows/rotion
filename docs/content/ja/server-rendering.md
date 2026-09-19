# サーバーでの描画

Rotion は静的エクスポートを前提にしていません。
エクスポーターは通常の Node.js のコードなので、ページがリクエストされたときにサーバー上で動かせます。
呼び出す場所は、動的に描画する（または再検証する）Next.js のサーバーコンポーネント、`getServerSideProps`、サーバー出力にした Astro のページなどです。
コンポーネントは、どちらの場合も返ってきたデータを同じように描画します。

サーバーで動かす場合は、3つのことに気を配る必要があります。
プロセスが書き込めるディスク、Rotion がダウンロードしたファイルの配信、そして Notion での編集を反映させるキャッシュの設定です。

## 必要な環境

- **Node.js のランタイム**：エクスポーターはファイルシステム、`https`、`sharp` を使うので、Edge ランタイムでは動きません。
- **書き込めて、消えないディスク**：リクエストのたびに `.cache`（`ROTION_CACHEDIR`）へ書き込み、`ROTION_DOCROOT` の下にファイルをダウンロードすることがあります。常駐するサーバーや、ボリュームを付けたコンテナであれば、これらがリクエストをまたいで残ります。一時ディレクトリにしか書き込めず、インスタンスごとにそれを捨てるサーバーレス環境では、キャッシュもダウンロードしたファイルも失われます。
- **作業ディレクトリの `package.json`**：[設定](configuration)にあるとおり、Rotion は import された時点でこれを読みます。サーバーはプロジェクトのルートで起動してください。
- **サーバー上の `NOTION_TOKEN`**：トークンはサーバーのプロセスの中にとどまります。`rotion` はサーバー側のコードからだけ import し、クライアントコンポーネントからは import しないでください。

## リクエスト時に描画する

App Router では、エクスポーターを呼ぶページは、動的にする指定がなければビルド時に描画されます。
`next.config.ts` から `output: 'export'` を外し、ページを動的にします。

```tsx filename="app/[id]/page.tsx"
export const dynamic = 'force-dynamic'
```

リクエスト時に描画しつつ、結果をしばらく使い回すなら、代わりに `revalidate`（秒）を export します。
描画の回数が減れば Notion へのリクエストも減ります。
Notion API が許すのは、平均して毎秒3リクエストまでです。

```tsx filename="app/[id]/page.tsx"
export const revalidate = 60
```

`generateStaticParams` がなければ、どの `[id]` も最初にリクエストされたときに描画されます。

## ダウンロードしたファイルの配信

エクスポーターは `/images/block-<id>-<hash>.webp` のようなパスを返し、ファイルを `ROTION_DOCROOT`（デフォルトは `public`）の下にダウンロードします。
ところが `next start` が配信するのは、サーバーの起動時に `public` にあったファイルだけです。
そのため、サーバーの稼働中にダウンロードした画像は、次に再起動するまで 404 になります。

ドキュメントルートを `public` の外に移し、ルートハンドラーで配信します。

```bash
ROTION_DOCROOT=storage npm start
```

```ts filename="app/images/[name]/route.ts"
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const dir = path.join(process.cwd(), process.env.ROTION_DOCROOT || 'public', 'images')
const types: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

export async function GET (_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  // ../ のように、ファイル名だけではないものは拒否する
  if (name !== path.basename(name)) {
    return new Response('Not Found', { status: 404 })
  }
  try {
    const body = await readFile(path.join(dir, name))
    return new Response(body, {
      headers: {
        'Content-Type': types[path.extname(name).toLowerCase()] || 'application/octet-stream',
        // ファイル名にハッシュを含むので、画像が変われば名前も変わる
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}
```

ビルド時にもページを描画するなら、`next build` にも同じ `ROTION_DOCROOT` を指定して、ファイルの置き場所を揃えます。
ファイル、PDF、動画のブロックは `/files/...`（`ROTION_FILEDIR`）を使います。
ページにこれらのブロックがあるなら、`files` から読む同じハンドラーを `app/files/[name]/route.ts` として追加します。
nginx などのリバースプロキシを置く場合は、代わりにプロキシから `/images/` と `/files/` をドキュメントルートから直接配信してもかまいません。

## コンテンツを最新に保つ

デフォルトでは、Rotion は一度結果を得た呼び出しに `.cache` から答えます。
そのため、稼働中のサーバーには Notion での編集が届きません。
[インクリメンタルキャッシュ](caching#incremental-cache)を有効にし、`last_edited_time` を渡します。

```bash
ROTION_INCREMENTAL_CACHE=true ROTION_DOCROOT=storage npm start
```

```tsx filename="app/[id]/page.tsx"
const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
```

`'force'` を渡した `FetchPage` は、呼ぶたびに Notion にページを問い合わせます。
`FetchBlocks` がブロックを取得し直すのは、ページの `last_edited_time` が変わったときだけです。
`FetchDatabase` はクエリの結果を `ROTION_CACHE_AVAILABLE_DURATION` ミリ秒（デフォルトは2分）のあいだ使い回すので、データベースに追加や編集した行はその時間内に反映されます。

Notion のレート制限にかかったリクエストは、`ROTION_LIMITED_WAITTIME`（デフォルトは1分）待ってからリトライされ、閲覧者もそのあいだ待たされます。
`revalidate` を使えば Notion へのリクエストを少なく保てます。
`ROTION_LIMITED_WAITTIME` を短くすれば、待ち時間も短くなります。
