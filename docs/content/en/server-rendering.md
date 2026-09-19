# Server rendering

Rotion does not require a static export. The exporter is ordinary Node.js code, so it can run on a server when a page is requested: in a dynamically rendered or revalidated Next.js server component, in `getServerSideProps`, or in an Astro page with server output. The components render the returned data the same way in either case.

[examples/nextjs-server](https://github.com/linyows/rotion/tree/main/examples/nextjs-server) puts everything on this page together.

A server adds three things to take care of: the process needs a writable disk, the files Rotion downloads have to be served, and the cache has to let edits in Notion through.

## Requirements

- **Node.js runtime.** The exporter uses the file system, `https` and `sharp`, so it does not run in an edge runtime.
- **A writable, persistent disk.** Each request can write to `.cache` (`ROTION_CACHEDIR`) and download files below `ROTION_DOCROOT`. A long-running server or a container with a volume keeps them between requests. Serverless platforms that allow writing only to a temporary directory, and discard it between instances, lose the cache and the downloaded files.
- **`NOTION_TOKEN` on the server.** The token stays in the server process. Import `rotion` only from server code, never from a client component.

## Render pages on request

In the App Router, a page that calls the exporter is rendered at build time unless something makes it dynamic. Remove `output: 'export'` from `next.config.ts`, and mark the page as dynamic:

```tsx filename="app/[id]/page.tsx"
export const dynamic = 'force-dynamic'
```

To render on request but reuse the result for a while, export `revalidate` (in seconds) instead. Fewer renders also mean fewer requests to Notion, which allows an average of three requests per second:

```tsx filename="app/[id]/page.tsx"
export const revalidate = 60
```

Without `generateStaticParams`, any `[id]` is rendered when it is first requested.

## Serve the downloaded files

The exporter returns paths such as `/images/block-<id>-<hash>.webp` and downloads the file below `ROTION_DOCROOT`, which is `public` by default. `next start` serves only the files that were in `public` when the server started. An image downloaded while the server is running is therefore answered with 404 until the next restart.

Move the document root out of `public`, and serve it with a route handler:

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
  // Reject anything that is not a plain file name, such as ../
  if (name !== path.basename(name)) {
    return new Response('Not Found', { status: 404 })
  }
  try {
    const body = await readFile(path.join(dir, name))
    return new Response(body, {
      headers: {
        'Content-Type': types[path.extname(name).toLowerCase()] || 'application/octet-stream',
        // The file name contains a hash, so a changed image gets a new name
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}
```

Set `ROTION_DOCROOT` for `next build` too if the build renders pages, so that every file ends up in the same place. File, PDF and video blocks use `/files/...` (`ROTION_FILEDIR`); add the same handler as `app/files/[name]/route.ts`, reading from `files`, if your pages contain them. Behind a reverse proxy such as nginx, you can instead let the proxy serve `/images/` and `/files/` from the document root directly.

## Keep the content up to date

By default, Rotion answers every call from `.cache` once it has a result, so a running server never sees an edit in Notion. Turn on the [incremental cache](caching#incremental-cache) and pass `last_edited_time`:

```bash
ROTION_INCREMENTAL_CACHE=true ROTION_DOCROOT=storage npm start
```

```tsx filename="app/[id]/page.tsx"
const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
```

`FetchPage` with `'force'` asks Notion for the page on every call, and `FetchBlocks` fetches the blocks again only when the page's `last_edited_time` has changed. `FetchDatabase` reuses a query for `ROTION_CACHE_AVAILABLE_DURATION` milliseconds (two minutes by default), so a new or edited row in a database appears within that time.

A request that hits the Notion rate limit waits `ROTION_LIMITED_WAITTIME` (one minute by default) before it is retried, and the reader waits with it. `revalidate` keeps the number of requests to Notion low, and a shorter `ROTION_LIMITED_WAITTIME` shortens the wait.
