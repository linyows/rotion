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

Create a Notion integration and obtain your API key and database ID.

### 2. Export Data

Use the APIs under `src/exporter` to fetch data from Notion and save it as static files.

Example:
```ts
import { FetchDatabase, FetchBlocks } from 'rotion'

const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })
const page = await FetchBlocks({ block_id: 'YOUR_PAGE_ID' })
```

### 3. Render with React Components

Use the components under `src/ui` to display the fetched data.

Example:
```tsx
import { Gallery } from 'rotion/ui'

<Gallery db={db} keys={['Name', 'Description']} />
```

Main Exports
--

### Data Fetching Functions (exporter)

- `FetchDatabase` – Fetches and caches the database.
- `FetchBlocks` – Fetches and caches page blocks.
- `FetchPage` – Fetches page information.
- `FetchBreadcrumbs` – Fetches breadcrumb information.

### UI Components

- `Gallery`, `Table`, `List` – Various displays for Notion databases.
- `Page` – Renders a Notion page.
- Various Block components (TextBlock, ImageBlock, CodeBlock, ...).
- `Icon`, `RichText`, `Checkbox`, etc.

Scripts
--

- `npm run build` – Build.
- `npm run test` – Run tests.
- `npm run story` – Launch Storybook.

Requirements
--

- Node.js 18 or later (recommended).
- Compatible with React 17, 18, and 19.

License
--

MIT

Author
--

[@linyows](https://github.com/linyows) 