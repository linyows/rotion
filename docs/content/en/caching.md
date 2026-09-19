# Caching

A site with a few hundred pages makes thousands of Notion API requests, and the API allows an average of three requests per second per integration. Rotion therefore keeps every response on disk and, by default, never asks Notion twice for the same thing. This page explains what is stored, when it is fetched again, and how to keep the cache between CI runs.

## The .cache directory

Each exporter call writes its result as JSON into `.cache` (change the location with `ROTION_CACHEDIR`). The file name comes from the call:

| Call | Cache file |
|------|-----------|
| `FetchDatabase` | `notion.databases.query-<hash of the arguments>`, plus `.limit-<n>` when `page_size` is given |
| `FetchPage` | `notion.pages.retrieve-<page id>` |
| `FetchBlocks` | `notion.blocks.children.list-<block id>`, one file per block that has children |
| Other lookups | `notion.pages.properties.retrieve-…`, `notion.databases.retrieve-…`, `notion.blocks.retrieve-…` |

The "other lookups" are requests Rotion makes on the way: page property values for `FetchPage`, databases for child database blocks and mentions, and the parents of a page for breadcrumbs. Unlike the three main calls, these files are reused only while they are younger than `ROTION_CACHE_AVAILABLE_DURATION` (two minutes by default), whether or not the incremental cache is on. They are requested only when the result that needs them is fetched, so a `FetchPage` served from its own cache file does not touch them; a direct call to `FetchBreadcrumbs` does.

The cached JSON already contains the local paths of downloaded images and files, so a build that reads the cache neither calls Notion nor downloads anything. `.cache/locks` holds lock files that stop parallel build workers from fetching the same page twice at the same time.

## Default: reuse everything

Without further settings, `FetchDatabase`, `FetchPage` and `FetchBlocks` return the cache file whenever it exists. Once the cache is filled, these calls make no requests, but an edit in Notion does not appear until you delete the matching files, or the whole `.cache`:

```bash
rm -rf .cache
```

This suits sites that change rarely, or builds that start from an empty cache anyway.

## Incremental cache

With `ROTION_INCREMENTAL_CACHE=true`, Rotion fetches again only what may have changed.

- **Databases**: a cached query is reused while it is younger than `ROTION_CACHE_AVAILABLE_DURATION` milliseconds (default 120000, two minutes), measured from the cache file's modification time. After that, the query is sent again. This keeps one build, which calls `FetchDatabase` from many pages, down to one query per database.
- **Pages and blocks**: `FetchPage` and `FetchBlocks` compare the `last_edited_time` you pass with the one stored in the cache. The cache is reused when they are equal and fetched again when they differ.

If you do not pass `last_edited_time`, there is nothing to compare, and the cache is reused as in the default mode. Passing it is what makes the incremental cache work:

```ts
import { FetchBlocks, FetchDatabase, FetchPage } from 'rotion'

// Rows of a database carry their last_edited_time
const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })
for (const page of db.results) {
  await FetchBlocks({ block_id: page.id, last_edited_time: page.last_edited_time })
}

// A single page: 'force' never matches the cache, so the page is always requested,
// and its current last_edited_time decides whether the blocks are fetched
const page = await FetchPage({ page_id: 'YOUR_PAGE_ID', last_edited_time: 'force' })
const blocks = await FetchBlocks({ block_id: 'YOUR_PAGE_ID', last_edited_time: page.last_edited_time })
```

Pass the page's `last_edited_time`, not a block's. When a block inside a toggle, column, list item or synced block is edited, Notion updates the page's `last_edited_time` but not the parent block's. Rotion passes the value it receives down to the nested blocks, so a changed page refetches its nested blocks too.

Some blocks show content from another page or database: the source of a synced block, a mentioned page or database, a child page, a child database. Editing that content does not change the `last_edited_time` of the page that shows it. `FetchBlocks` therefore records these pages and databases, with their `last_edited_time`, in the cache as `dependencies`, and before it reuses the cache it asks Notion for their current `last_edited_time`. If one of them changed, the blocks are fetched again. The answers are kept for `ROTION_CACHE_AVAILABLE_DURATION`, so each dependency costs at most one request in that period. The blocks of a synced block's source are cached with the `last_edited_time` of the page the source is in.

> [!WARNING]
>
> Use `'force'` with `FetchPage` only. `FetchBlocks` stores the value it is given in the cache, so `FetchBlocks` with `'force'` refetches once and then matches its own stored `'force'` on the next build.

## Rate limits and retries

Every Notion request goes through a retry loop. When the API answers `rate_limited`, `internal_server_error`, `service_overload`, `service_unavailable` or `gateway_timeout`, or the Notion client reports an unexpected response or a timeout, Rotion prints a warning, waits `ROTION_LIMITED_WAITTIME` milliseconds (default 60000, one minute) and tries again, up to three attempts in total. Other errors, such as a missing page or an invalid filter, are thrown at once with the reason from the API.

`ROTION_WAITTIME` adds a pause, in milliseconds, after every successful request (default 0). A value such as `350` keeps a cold build under the three-requests-per-second average instead of relying on retries.

## Downloaded images and files

Notion's file URLs expire after about an hour, so Rotion saves the files themselves and stores the local path in the cached JSON.

- **Images** (image blocks, page and database covers and icons, callout icons, avatars, bookmark images) go to `<ROTION_DOCROOT>/<ROTION_IMAGEDIR>`, `public/images` by default. The returned `src` is the path from the document root, such as `/images/block-<id>-<hash>.webp`.
- **Files** (file, PDF and uploaded video blocks) go to `<ROTION_DOCROOT>/<ROTION_FILEDIR>`, `public/files` by default, and are not converted.

Images are converted to WebP with quality `ROTION_WEBP_QUALITY` (default 95) and rotated according to their EXIF orientation. GIF, SVG, ICO and images that are already WebP are kept as they are. HEIC and HEIF images are first converted to PNG. Set `ROTION_WEBP_QUALITY=0` to skip the WebP conversion (HEIC and HEIF still become PNG).

A file that already exists on disk is not downloaded again. The local name is built from the ID of the block or page it belongs to and a hash of the file name in the URL. Replacing an image with a file of a different name therefore downloads the new one; replacing it with a file of the same name keeps the old copy until you delete it. Files that are no longer referenced stay until you remove them; see [Removing unused files](#removing-unused-files).

The HTTP requests Rotion makes itself (downloads, and fetching pages for bookmark and embed metadata) send the `ROTION_UA` user agent, give up when the connection is idle for `ROTION_TIMEOUT` milliseconds (default 1500), and follow at most `ROTION_MAX_REDIRECTS` redirects (default 5). Only a successful (2xx) response is saved. A download that fails leaves the block without a local `src`; see [Failed requests](#failed-requests).

`ROTION_SKIP_DOWNLOAD=true` makes image downloads return the path without fetching the file. It exists for Rotion's own tests.

## Failed requests

A failure inside a page does not stop the build. Rotion prints one line to stderr for it, and leaves that part out: an image without a local `src`, a mention shown as `--`, a nested block without its children.

```
[rotion] failed to get image of block 1a2b...: saveImage download error -- path: public/images/block-1a2b....png, url: https://..., message: HTTPStatusError: unexpected status 503: https://...
[rotion] not caching the blocks of 9f8e... because of a transient failure; they are fetched again on the next call
```

Whether the result is cached depends on the failure.

- **Transient failures**: a rate limit or server error that is still there after the retries, a timeout, a network error, or an HTTP 5xx, 408 or 429 from a download. The result is not cached, so the next build (or request) fetches it again. A failure in a nested block keeps the page that contains it out of the cache too. Rotion prints a `not caching ...` line for each.
- **Permanent failures**: an HTTP 4xx such as a deleted image, or a page or database the integration cannot access. They would fail the same way again, so the result is cached with the part left out.

Bookmark metadata, embeds, video embeds and GitHub link previews come from third-party sites. Their failures are printed, but never keep a result out of the cache.

Set `ROTION_STRICT=true` to fail instead: the first failure that is not a third-party extra is thrown as an error, and nothing is cached for the page. Use it in CI when a site with a missing image should not be published.

`ROTION_DEBUG=true` prints the whole error, with the arguments of a failed Notion request, after each line.

## Removing unused files

The cache and the downloads only grow: a page that was deleted in Notion, or an image that was replaced, leaves its files behind. The `rotion prune` command removes what Rotion has not used for a given period:

```bash
npx rotion prune --unused-for 7d            # s, m, h or d
npx rotion prune --before 2026-09-20T00:00:00Z
npx rotion prune --unused-for 7d --dry-run  # only list
```

It prints the removed paths and a count. The directories come from the same environment variables as a build (`ROTION_CACHEDIR`, `ROTION_DOCROOT`, `ROTION_IMAGEDIR`, `ROTION_FILEDIR`). From code, `pruneCache` does the same:

```ts
import { pruneCache } from 'rotion'

const { removed } = await pruneCache({ before: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) })
```

Rotion marks what it uses by setting the file's access time: a cache file when it is read or written, a download when it is saved or found on disk, and every image and file that a cached result refers to when that result is read. So a page served from the cache keeps its images. The modification time, which decides how long a cache file stays fresh, is not changed.

- Only files named the way Rotion names them are removed: cache files that start with `notion.`, and downloads whose name ends with a hash (`block-<id>-<hash>.webp`). Other files in `public/images`, such as images of the site itself, are kept.
- A download and its conversions (the WebP of an image, the PNG of a HEIC image) are removed together, and only when none of them was used.
- Temporary files that a failed write left behind are removed as well. Lock files are not touched.
- `dryRun: true` returns the list without removing anything.

Choose the period so that nothing in use can be older. A full build marks everything it shows, so right after one, any period longer than the build takes is safe:

```json
{
  "scripts": {
    "build": "next build && rotion prune --unused-for 1h"
  }
}
```

On a server, use a period longer than any page is served without calling Rotion again, such as the `revalidate` of your pages plus a margin, and run it from a scheduled job.

## Keeping the cache in CI

On CI, each run starts from an empty checkout. Restoring `.cache` together with `public/images` and `public/files` turns a full fetch into an incremental one. Restore all three or none: the cached JSON points to image paths, and a cache hit does not download the images again.

The following workflow is based on the one that builds Rotion's own site on GitHub Actions:

```yaml filename=".github/workflows/pages.yml"
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
      ROTION_INCREMENTAL_CACHE: 'true'
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm
      - name: Restore rotion cache
        uses: actions/cache@v4
        with:
          path: |
            .cache
            public/images
            public/files
          key: rotion-${{ github.run_id }}
          restore-keys: rotion-
      - run: npm ci
      - run: npm run build
```

`actions/cache` never overwrites an existing key. With a fixed key the first run's cache would be restored forever and the new downloads never saved, so the key includes the run ID, and `restore-keys` picks the most recent earlier cache.
