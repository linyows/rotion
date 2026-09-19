# サンプル

リポジトリの [examples/](https://github.com/linyows/rotion/tree/main/examples) には、4つのサンプルプロジェクトがあります。
どれも1つの Notion データベースから同じサイトを作ります。
データベースをテーブルで表示するトップページと、行ごとに本文を表示するページです。
違うのは、フレームワークと、ページを前もってビルドするかサーバーで描画するかです。

| サンプル | フレームワーク | データを取得する場所 |
|----------|----------------|----------------------|
| [nextjs-approuter](https://github.com/linyows/rotion/tree/main/examples/nextjs-approuter) | Next.js App Router | サーバーコンポーネント、`generateStaticParams`、`generateMetadata` |
| [nextjs-server](https://github.com/linyows/rotion/tree/main/examples/nextjs-server) | Node.js のサーバーで動かす Next.js App Router | リクエスト時に描画するサーバーコンポーネント（`revalidate` 付き） |
| [nextjs-pagerouter](https://github.com/linyows/rotion/tree/main/examples/nextjs-pagerouter) | Next.js Pages Router | `getStaticProps`、`getStaticPaths` |
| [astro](https://github.com/linyows/rotion/tree/main/examples/astro) | Astro と `@astrojs/react` | `.astro` のフロントマター、`getStaticPaths` |

## データベースの準備

次のプロパティを持つ Notion のデータベースを作り、本文のある行をいくつか追加して、インテグレーションを接続します（[はじめかた](getting-started#create-a-notion-integration)を参照）。

| プロパティ | 種類 |
|------------|------|
| `Title` | タイトル |
| `Tags` | マルチセレクト |
| `Date` | 日付 |

名前は一致させる必要があります。
サンプルは `keys` に `['Title', 'Tags', 'Date']` を渡し、`Title` の列を `/[id]` にリンクしています。

## サンプルの実行

どのサンプルも2つの変数を使います。
Rotion が読む `NOTION_TOKEN` と、サンプルのコードが読む `NOTION_DATABASE_ID` です。
Next.js のサンプルは、これらを `.env.local` から読み込みます。

```bash
cd examples/nextjs-approuter
cat > .env.local <<'EOF'
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=668d797c76fa49349b05ad288df2d136
EOF
npm install
npm run dev
```

`npm run build` を実行すると、静的エクスポートが `out/` に書き出されます。
ただし nextjs-server だけは、ビルドの後に `npm start` でサーバーを起動します。
サンプルは `rotion` をリポジトリではなく npm からインストールします。
ローカルでビルドした Rotion を `npm pack` で試す方法は、各サンプルの README にあります。

## nextjs-approuter

- `app/compornents/ClientLink.tsx` が、`createClientLink` で `next/link` を包みます。
- `app/page.tsx` は、サーバーコンポーネントでデータベースを取得し、`<Table>` を包む小さなクライアントコンポーネントを通じて描画します。`href: { Title: '/[id]' }` とクライアント用のリンクを渡しています。
- `app/compornents/Header.tsx` は非同期のサーバーコンポーネントで、タイトルを得るために同じデータベースをもう一度取得します。2回目の呼び出しはキャッシュから返ります。
- `app/[id]/page.tsx` は、`generateStaticParams` で行を列挙し、各ページを `FetchPage({ page_id, last_edited_time: 'force' })` で、ブロックをページの `last_edited_time` を渡して取得します。タイトルは `page.meta` から読み、`page.icon?.src` を `next/image` で表示します。
- `app/layout.tsx` は `rotion/style-without-dark.css` を import しています。
- `next.config.ts` は `output: 'export'` と `images.unoptimized` を指定しています。

手順の解説は [App Router](app-router) にあります。

## nextjs-server

nextjs-approuter と同じサイトを、書き出す代わりに `next start` で描画します。

- `next.config.ts` には `output: 'export'` がありません。
- `app/page.tsx` と `app/[id]/page.tsx` は `revalidate = 60` を export しています。`app/[id]/page.tsx` には `generateStaticParams` がないので、各行のページは最初のリクエストで描画され、その後は多くても1分に1回だけ描画し直されます。
- 秘密ではない設定（`ROTION_DOCROOT=storage` と `ROTION_INCREMENTAL_CACHE=true`）を書いた `.env` をコミットしています。`NOTION_TOKEN` と `NOTION_DATABASE_ID` は、ほかのサンプルと同じく `.env.local` に書きます。
- `next start` は起動時に `public/` にあったファイルしか配信しません。そのため `app/images/[name]/route.ts` と `app/files/[name]/route.ts` が、`lib/serveFile.ts` を通じて `storage/` からダウンロード済みのファイルを配信します。

手順の解説は [サーバーでの描画](server-rendering) にあります。

## nextjs-pagerouter

- `pages/index.tsx` は、`getStaticProps` でデータベースを取得し、`next/link` をそのまま `link` に渡して `<Table>` を描画します。
- `pages/[id].tsx` は、`getStaticPaths` で `fallback: false` とともにすべての行を返し、`getStaticProps` でページとデータベースを並行して取得してから、ブロックを取得します。
- `pages/_app.tsx` は `rotion/style.css` を import しているので、このサンプルはシステムのダークモードに従います。

手順の解説は [Pages Router](pages-router) にあります。

## astro

- `src/pages/index.astro` は、フロントマターでデータベースを取得し、React の `<Table>` のラッパーを描画します。
- `src/pages/[id].astro` は、`getStaticPaths` ですべての行を返し、各ページとそのブロックを取得します。
- `src/components/NotionPage.tsx` は `<Page>` を包みます。ページは React のコンポーネントを `client:load` でハイドレートします。
- `astro.config.mjs` は React のインテグレーションを追加し、`output: 'static'` を指定しています。

Astro のサンプルは、変数を `.env` から `import.meta.env` を通じて読みます。

```bash
cd examples/astro
cat > .env <<'EOF'
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=668d797c76fa49349b05ad288df2d136
EOF
npm install
npm run dev
```

Rotion 自身は、import された時点で `process.env` から `NOTION_TOKEN` を読みます。
サンプルのページは、`import.meta.env` の値を `process.env` にコピーしています。
ビルドを実行するシェルで変数を設定すれば（`NOTION_TOKEN=... npm run build`）、Astro が `.env` をどう読み込むかにかかわらず Rotion に値が渡ります。
開発サーバーは `http://localhost:4321` で動き、`npm run build` はサイトを `dist/` に書き出します。
