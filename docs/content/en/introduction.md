# Introduction

Rotion turns Notion pages and databases into a website. It is an npm package with two parts: an exporter, imported as `rotion`, that reads your workspace through the Notion API, and a set of React components, imported as `rotion/ui`, that render what the exporter returns. The exporter runs wherever Node.js runs: at build time, so the result is plain HTML, CSS and files that any static host can serve, or on a server when a page is requested.

## How it works

Rendering a page with Rotion goes through four steps.

1. **Notion API.** The exporter calls the official Notion API with an integration token (`NOTION_TOKEN`). It sees only the pages and databases you have shared with that integration.
2. **Fetch and cache.** `FetchDatabase`, `FetchPage` and `FetchBlocks` request the data, follow nested blocks (toggles, columns, synced blocks, tables…) and write each response as JSON into `.cache`. The next call reads the JSON instead of calling the API again.
3. **Download files.** Notion serves uploaded images and files from URLs that expire after about an hour, so the exporter downloads them into `public/` (`public/images` and `public/files` by default), converts images to WebP, and puts the local path into the returned data as `src`. Bookmarks, embeds and link previews are resolved into HTML and metadata at the same time.
4. **Render.** You pass the returned objects to components such as `<Page>`, `<Table>` or `<Gallery>`. They render markup that looks like Notion and reference only the local files, so the generated HTML no longer depends on Notion or its URLs.

The exporter runs in Node.js: in a Next.js server component, `getStaticProps` or `getServerSideProps`, or the frontmatter of an Astro page. The components are ordinary React components and render on the server; a few of them (the calendar's month navigation, toggles, code highlighting, Mermaid diagrams, the PDF viewer) also run in the browser.

## What it is good for

Rotion fits sites whose content is written in Notion: a blog, documentation, a portfolio, a changelog, an event calendar. Editors keep using Notion, and the site picks up what they publish in one of two ways.

- **Static site.** The site is rebuilt when editors publish. Because the output is static, it can be hosted on GitHub Pages, Cloudflare Pages, S3 or any CDN, and the Notion token never leaves the build machine.
- **Server rendering.** A Node.js server renders the pages on request, and edits appear without a rebuild, as soon as the cache lets them through. The server needs a writable disk and has to serve the files Rotion downloads. See [Server rendering](server-rendering).

It is not a live mirror of Notion. Even on a server, Rotion reads through its cache, and the site cannot write back to Notion or show pages that require the reader to sign in. Rotion also covers the block types and database property types listed in these docs, not everything Notion can show; unsupported blocks are skipped.

## Supported frameworks

- **Next.js App Router**: server components call the exporter, and `createClientLink` makes `next/link` usable inside Rotion's components. See [App Router](app-router).
- **Next.js Pages Router**: `getStaticProps` and `getStaticPaths` call the exporter and pass the data as props. See [Pages Router](pages-router).
- **Astro**: `.astro` pages call the exporter in their frontmatter and render Rotion's React components through `@astrojs/react`. See [Examples](examples).

Any other React setup that can run Node.js code, at build time or on a server, works the same way.

## Where to go next

- [Getting started](getting-started) builds a first page from a Notion page.
- [Database views](database-views) shows databases as tables, lists, galleries and calendars.
- [Server rendering](server-rendering) runs Rotion on a Node.js server instead of a static export.
- [Caching](caching) explains how `.cache` and the downloaded files behave between builds and requests.
- [API](api), [Components](components) and [Configuration](configuration) are the reference.
