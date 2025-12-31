# Rotion Astro Example

This example demonstrates how to use [Rotion](https://github.com/linyows/rotion) with Astro for static site generation.

## Why Astro?

Astro is a modern static site generator that:
- Supports React components while maintaining zero JavaScript by default
- Enables server-side rendering during build time
- Provides excellent performance with partial hydration
- Works perfectly with Rotion's static generation approach

## Getting Started

### 1. Set Up Notion API

Create a Notion integration and obtain your API key and page ID:

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the integration token
4. Share your Notion pages with the integration
5. Copy the page ID from the URL

### 2. Configure Environment Variables

Create a `.env` file in this directory:

```bash
cp .env.example .env
```

Then edit `.env` and set your Notion credentials:

```env
NOTION_TOKEN=your_notion_token_here
NOTION_PAGE_ID=your_notion_page_id_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view your Notion page rendered in Astro.

## Build for Production

```bash
npm run build
```

This creates an optimized static build in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Development

### Testing Local Changes

To test local changes to the Rotion package before publishing:

1. Build the Rotion package from the root directory:
   ```bash
   cd ../../
   npm run build
   ```

2. Create a tarball of the package:
   ```bash
   npm pack
   ```

3. Install the tarball in this example:
   ```bash
   cd examples/astro
   npm uninstall rotion
   npm install ../../rotion-*.tgz
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

This workflow allows you to verify changes to the Rotion package in an Astro application before publishing.

## How It Works

- **index.astro**: The main page that fetches Notion data during build time using Rotion's `FetchBlocks` function
- **NotionPage.tsx**: A React component that wraps Rotion's `Page` component
- **astro.config.mjs**: Astro configuration with React integration

The Notion data is fetched at build time (SSG), not at runtime, ensuring fast page loads and no client-side API calls.

## Notes

- Astro fetches Notion data during the build process, making it secure (API keys never exposed to clients)
- The Rotion `Page` component is hydrated with `client:load` directive for interactive features
- For production use, rebuild your site whenever you update content in Notion
