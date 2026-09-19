// 読み手がしていることで分ける。最初のページを表示する、サイトに組み込む、
// 調べる、ブロックがどう描画されるかを見る。
export default {
  index: {
    title: 'ホーム',
    display: 'hidden',
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false,
      copyPage: false
    }
  },
  '-- start': { type: 'separator', title: 'はじめに' },
  introduction: 'Rotion とは',
  'getting-started': 'クイックスタート',
  examples: 'サンプル',
  '-- guides': { type: 'separator', title: 'ガイド' },
  'app-router': 'Next.js App Router',
  'pages-router': 'Next.js Pages Router',
  'server-rendering': 'サーバーでの描画',
  'database-views': 'データベースビュー',
  caching: 'キャッシュとファイル',
  '-- reference': { type: 'separator', title: 'リファレンス' },
  api: 'Fetch API',
  components: 'コンポーネント',
  configuration: '環境変数',
  '-- showcase': { type: 'separator', title: 'ショーケース' },
  blocks: 'ブロック',
  views: 'データベースビュー'
}
