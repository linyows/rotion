# Examples

The repository has four example projects in [examples/](https://github.com/linyows/rotion/tree/main/examples). All four build the same site from one Notion database: an index page with the database as a table, and one page per row with its content. They differ in the framework, and in whether the pages are built ahead of time or rendered on a server.

| Example | Framework | Fetches data in |
|---------|-----------|-----------------|
| [nextjs-approuter](https://github.com/linyows/rotion/tree/main/examples/nextjs-approuter) | Next.js App Router | Server components, `generateStaticParams`, `generateMetadata` |
| [nextjs-server](https://github.com/linyows/rotion/tree/main/examples/nextjs-server) | Next.js App Router on a Node.js server | Server components rendered on request, with `revalidate` |
| [nextjs-pagerouter](https://github.com/linyows/rotion/tree/main/examples/nextjs-pagerouter) | Next.js Pages Router | `getStaticProps`, `getStaticPaths` |
| [astro](https://github.com/linyows/rotion/tree/main/examples/astro) | Astro with `@astrojs/react` | The frontmatter of `.astro` pages, `getStaticPaths` |

## Prepare a database

Create a Notion database with these properties, add a few rows with some content, and connect your integration to it (see [Getting started](getting-started#create-a-notion-integration)):

| Property | Type |
|----------|------|
| `Title` | Title |
| `Tags` | Multi-select |
| `Date` | Date |

The names must match: the examples pass `['Title', 'Tags', 'Date']` as `keys` and link the `Title` column to `/[id]`.

## Run an example

Each example needs two variables: `NOTION_TOKEN`, read by Rotion, and `NOTION_DATABASE_ID`, read by the example's code. The Next.js examples load them from `.env.local`:

```bash
cd examples/nextjs-approuter
cat > .env.local <<'EOF'
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=668d797c76fa49349b05ad288df2d136
EOF
npm install
npm run dev
```

`npm run build` writes a static export into `out/`, except in nextjs-server, which is started with `npm start` after the build. The examples install `rotion` from npm, not from the repository; their READMEs describe how to try a local build with `npm pack`.

## nextjs-approuter

- `app/compornents/ClientLink.tsx` wraps `next/link` with `createClientLink`.
- `app/page.tsx` fetches the database in a server component and renders it through a small client component around `<Table>`, with `href: { Title: '/[id]' }` and the client link.
- `app/compornents/Header.tsx` is an async server component that fetches the same database again for its title; the second call is served from the cache.
- `app/[id]/page.tsx` lists the rows in `generateStaticParams`, fetches each page with `FetchPage({ page_id, last_edited_time: 'force' })` and its blocks with the page's `last_edited_time`, reads the title from `page.meta`, and shows `page.icon?.src` with `next/image`.
- `app/layout.tsx` imports `rotion/style-without-dark.css`.
- `next.config.ts` sets `output: 'export'` and `images.unoptimized`.

The walkthrough is in [App Router](app-router).

## nextjs-server

The same site as nextjs-approuter, rendered by `next start` instead of exported.

- `next.config.ts` has no `output: 'export'`.
- `app/page.tsx` and `app/[id]/page.tsx` export `revalidate = 60`. `app/[id]/page.tsx` has no `generateStaticParams`, so each row's page is rendered on its first request and regenerated at most once a minute.
- `.env` is committed with settings that are not secret: `ROTION_DOCROOT=storage` and `ROTION_INCREMENTAL_CACHE=true`. `NOTION_TOKEN` and `NOTION_DATABASE_ID` go in `.env.local` as in the other examples.
- `app/images/[name]/route.ts` and `app/files/[name]/route.ts` serve the downloaded files from `storage/` through `lib/serveFile.ts`, because `next start` serves only the files that were in `public/` when it started.

The walkthrough is in [Server rendering](server-rendering).

## nextjs-pagerouter

- `pages/index.tsx` fetches the database in `getStaticProps` and renders `<Table>` with `next/link` passed directly as `link`.
- `pages/[id].tsx` returns every row from `getStaticPaths` with `fallback: false`, and in `getStaticProps` fetches the page and the database in parallel, then the blocks.
- `pages/_app.tsx` imports `rotion/style.css`, so this example follows the system's dark mode.

The walkthrough is in [Pages Router](pages-router).

## astro

- `src/pages/index.astro` fetches the database in its frontmatter and renders a React `<Table>` wrapper.
- `src/pages/[id].astro` returns every row from `getStaticPaths`, and fetches each page and its blocks.
- `src/components/NotionPage.tsx` wraps `<Page>`. The pages hydrate the React components with `client:load`.
- `astro.config.mjs` adds the React integration and sets `output: 'static'`.

The Astro example reads its variables from `.env` through `import.meta.env`:

```bash
cd examples/astro
cat > .env <<'EOF'
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=668d797c76fa49349b05ad288df2d136
EOF
npm install
npm run dev
```

Rotion itself reads `NOTION_TOKEN` from `process.env` when it sends a request, and the pages copy the value there from `import.meta.env`. [`configure({ auth: import.meta.env.NOTION_TOKEN })`](configuration#configure-in-code) does the same without `process.env`. Exporting the variable in the shell that runs the build (`NOTION_TOKEN=... npm run build`) sets it for Rotion regardless of how Astro loads `.env`. The development server runs at `http://localhost:4321`, and `npm run build` writes the site into `dist/`.
