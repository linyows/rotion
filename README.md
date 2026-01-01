<p align="right">English | <a href="https://github.com/linyows/rotion/blob/main/README.ja.md">日本語</a></p>

<p align="center">
  <a href="https://rotion.linyo.ws">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/linyows/rotion/blob/main/misc/rotion-dark-bg.svg?raw=true">
      <img alt="Rotion" src="https://github.com/linyows/rotion/blob/main/misc/rotion.svg?raw=true" width="300">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/linyows/rotion/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/linyows/rotion/build.yml?branch=main&style=for-the-badge&labelColor=000000" alt="Github Actions" />
  </a>
  <a href="https://www.npmjs.com/package/rotion">
    <img src="http://img.shields.io/npm/v/rotion.svg?style=for-the-badge&labelColor=000000" alt="NPM" />
  </a>
</p>

**Rotion** is a set of components and tools that utilize the Notion API and React to generate a static website from your Notion databases and pages.  
It is designed primarily for use with Next.js (or other React frameworks) and stores images and other files locally, so that you can build a fully static site.

Official site: https://rotion.linyo.ws

Features
--

- Fetch and convert Notion databases and pages into static site data via the Notion API.
- Local storage of images, PDFs, and other files.
- Rich React components (Gallery, Table, List, Page, and various Blocks).
- Compatible with static site generators such as Next.js.
- **Next.js App Router support** with `createClientLink` helper (v2.0.1+).
- **Next.js Page Router support** for traditional SSG workflows.
- TypeScript support.

Installation
--

```bash
npm install rotion
```

or

```bash
yarn add rotion
```

Usage
--

### 1. Set Up Notion API

Create a Notion integration and obtain your API key and database ID:

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the integration token
4. Share your Notion pages/databases with the integration
5. Copy the page/database IDs from their URLs

### 2. Export Data

Use the APIs under `rotion` to fetch data from Notion:

```ts
import { FetchDatabase, FetchBlocks, FetchPage } from 'rotion'

// Fetch a database
const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })

// Fetch page blocks
const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })

// Fetch page information
const page = await FetchPage({ page_id: 'YOUR_PAGE_ID' })
```

### 3. Render with React Components

#### Next.js App Router (v15+)

For Next.js App Router, you need to set up the `createClientLink` helper:

**Step 1:** Create `app/lib/rotion.ts`:
```tsx
'use client'

import { createClientLink } from 'rotion/ui'
import NextLink from 'next/link'

export const ClientLink = createClientLink(NextLink)
```

**Step 2:** Use in your Server Components:
```tsx
// app/page.tsx
import { Page } from 'rotion/ui'
import { FetchBlocks } from 'rotion'
import { ClientLink } from './lib/rotion'
import type { Link } from 'rotion/ui'

export default async function MyPage() {
  const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })
  return <Page blocks={blocks} link={ClientLink as Link} />
}
```

#### Next.js Page Router

For Page Router, you can use Next.js Link directly:

```tsx
// pages/index.tsx
import type { GetStaticProps } from 'next'
import { Page } from 'rotion/ui'
import { FetchBlocks } from 'rotion'
import NextLink from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })
  return { props: { blocks } }
}

export default function MyPage({ blocks }) {
  return <Page blocks={blocks} link={NextLink} />
}
```

#### Database Views

Display Notion databases in different formats:

```tsx
import { Gallery, Table, List } from 'rotion/ui'
import { FetchDatabase } from 'rotion'

const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })

// Gallery view
<Gallery db={db} keys={['Name', 'Description', 'Image']} />

// Table view
<Table db={db} keys={['Name', 'Status', 'Date']} />

// List view
<List db={db} keys={['Name', 'Tags']} />
```

Main Exports
--

### Data Fetching Functions (from `rotion`)

- `FetchDatabase` – Fetches and caches a Notion database
- `FetchBlocks` – Fetches and caches page blocks
- `FetchPage` – Fetches page information
- `FetchBreadcrumbs` – Fetches breadcrumb information

### UI Components (from `rotion/ui`)

**Database Views:**
- `Gallery` – Gallery view for databases
- `Table` – Table view for databases
- `List` – List view for databases

**Page & Blocks:**
- `Page` – Renders a complete Notion page
- Various Block components (TextBlock, ImageBlock, CodeBlock, CalloutBlock, etc.)

**Utilities:**
- `Icon` – Renders Notion icons
- `RichText` – Renders Notion rich text
- `Checkbox` – Renders checkboxes
- `createClientLink` – Helper for Next.js App Router (v2.0.1+)

Examples
--

The `examples/` directory contains complete working examples demonstrating Notion database integration:

### [app-router](./examples/app-router)
Next.js App Router example with database support:
- Database table view on the index page
- Dynamic `[id]` routes for individual articles
- Server Components with `generateStaticParams`
- CSS Modules for styling

```bash
cd examples/app-router
cp .env.example .env.local
# Add your NOTION_TOKEN and NOTION_DATABASE_ID
npm install
npm run dev
```

### [page-router](./examples/page-router)
Next.js Pages Router example with database support:
- Database table view using `getStaticProps`
- Dynamic `[id]` routes with `getStaticPaths`
- Traditional SSG workflow

```bash
cd examples/page-router
cp .env.example .env.local
# Add your NOTION_TOKEN and NOTION_DATABASE_ID
npm install
npm run dev
```

### [astro](./examples/astro)
Astro example with database support:
- Database table view in `.astro` files
- Dynamic routes with `getStaticPaths`
- React components with `client:load`

```bash
cd examples/astro
cp .env.example .env
# Add your NOTION_TOKEN and NOTION_DATABASE_ID
npm install
npm run dev
```

All examples display a Notion database with **Title**, **Tags**, and **Date** fields, and include navigation to individual article pages.

Scripts
--

- `npm run build` – Build.
- `npm run test` – Run tests.
- `npm run story` – Launch Storybook.

Requirements
--

- Node.js 18 or later (recommended)
- React 17, 18, or 19
- Next.js 13+ (for App Router features, Next.js 15+ recommended)

License
--

MIT

Author
--

[@linyows](https://github.com/linyows) 