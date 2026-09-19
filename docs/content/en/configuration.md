# Configuration

Rotion is configured with environment variables, or in code with [`configure`](#configure-in-code). The variables are read each time Rotion uses them, so they only have to be set before the first fetch: in `.env.local` for Next.js, in the CI job's environment, or on the command line.

```bash
NOTION_TOKEN=ntn_xxx ROTION_INCREMENTAL_CACHE=true npm run build
```

## Variables

| Name | Default | Description |
|------|---------|-------------|
| `NOTION_TOKEN` | none (**required**) | Secret of the Notion integration. Every API request uses it. |
| `GOOGLEMAP_KEY` | none | Google Maps Embed API key. Needed to turn a Google Maps link in an embed block into a map; without it the map is not embedded. |
| `ROTION_CACHEDIR` | `.cache` | Directory for cached API responses and lock files. |
| `ROTION_INCREMENTAL_CACHE` | `false` | `true` refetches databases after `ROTION_CACHE_AVAILABLE_DURATION`, and pages and blocks when the `last_edited_time` you pass differs from the cached one. Otherwise an existing cache is always used. See [Caching](caching#incremental-cache). |
| `ROTION_CACHE_AVAILABLE_DURATION` | `120000` (ms, 2 minutes) | How long a cached database query is used before it is sent again, with the incremental cache on. Also how long the cached lookups for page properties, databases and breadcrumbs are used, in either mode. |
| `ROTION_DOCROOT` | `public` | Directory that is served as the site root. Downloaded images and files go below it. |
| `ROTION_IMAGEDIR` | `images` | Directory for images, relative to `ROTION_DOCROOT`. Also the first segment of the image paths in the data (`/images/...`). |
| `ROTION_FILEDIR` | `files` | Directory for files, PDFs and videos, relative to `ROTION_DOCROOT`. Also the first segment of their paths (`/files/...`). |
| `ROTION_WEBP_QUALITY` | `95` | Quality (1–100) of the WebP images converted from downloads. `0` skips the conversion. |
| `ROTION_WAITTIME` | `0` (ms) | Pause after every successful Notion API request. |
| `ROTION_LIMITED_WAITTIME` | `60000` (ms, 1 minute) | Pause before retrying a request that failed with a rate limit, a server error or a timeout. A request is tried up to three times. |
| `ROTION_TIMEOUT` | `1500` (ms) | Idle timeout of the HTTP requests Rotion makes itself: file downloads and fetching pages for bookmarks and embeds. Not used for Notion API requests. |
| `ROTION_MAX_REDIRECTS` | `5` | Maximum number of redirects followed by those HTTP requests. |
| `ROTION_UA` | `<name>/<version>` of the `package.json` in the current directory, or `rotion` without one | `User-Agent` header of those HTTP requests. Some sites answer differently depending on it; Rotion's own site builds with `ROTION_UA=curl`. |
| `ROTION_SKIP_QUERY_VALIDATION` | `false` | `true` sends database queries without checking the filter and sorts first. See [validateQuery](api#validatequery). |
| `ROTION_STRICT` | `false` | `true` throws on the first failure to fetch a part of a page, such as an image, instead of printing a warning and leaving it out. Third-party extras (bookmarks, embeds, link previews) only warn. See [Failed requests](caching#failed-requests). |
| `ROTION_DEBUG` | `false` | `true` logs cache decisions and lock activity, prints the whole error after each warning, and sets the Notion client's log level to debug. Failures are printed without it. |
| `ROTION_SKIP_DOWNLOAD` | `false` | `true` returns image paths without downloading the images. Intended for Rotion's tests. |

Boolean variables are enabled only by the exact string `true`. Numeric values are parsed as integers.

Paths in `ROTION_CACHEDIR` and `ROTION_DOCROOT` are relative to the current working directory, and so is the `package.json` that gives the default `ROTION_UA`.

## Configure in code

`configure` sets the same settings from code. A value given to it wins over its environment variable. Use it when environment variables are inconvenient: a framework that does not put `.env` into `process.env`, such as Astro's `import.meta.env`, or a token that comes from somewhere else.

```ts
import { configure } from 'rotion'

configure({
  auth: import.meta.env.NOTION_TOKEN,
  docRoot: 'storage',
  incrementalCache: true,
})
```

Call it before the first fetch. A later call adds to the earlier ones, and `undefined` goes back to the environment variable. The settings are process-wide.

| Option | Variable |
|--------|----------|
| `auth` | `NOTION_TOKEN` |
| `cacheDir` | `ROTION_CACHEDIR` |
| `docRoot` | `ROTION_DOCROOT` |
| `imageDir` | `ROTION_IMAGEDIR` |
| `fileDir` | `ROTION_FILEDIR` |
| `incrementalCache` | `ROTION_INCREMENTAL_CACHE` |
| `cacheAvailableDuration` | `ROTION_CACHE_AVAILABLE_DURATION` |
| `waitTime` | `ROTION_WAITTIME` |
| `limitedWaitTime` | `ROTION_LIMITED_WAITTIME` |
| `timeout` | `ROTION_TIMEOUT` |
| `webpQuality` | `ROTION_WEBP_QUALITY` |
| `maxRedirects` | `ROTION_MAX_REDIRECTS` |
| `userAgent` | `ROTION_UA` |
| `googleMapKey` | `GOOGLEMAP_KEY` |
| `skipQueryValidation` | `ROTION_SKIP_QUERY_VALIDATION` |
| `strict` | `ROTION_STRICT` |
| `debug` | `ROTION_DEBUG` |


## Variables used by the examples

`NOTION_DATABASE_ID`, used throughout these docs and in the [examples](examples), is not read by Rotion. The examples read it in their own code and pass it to `FetchDatabase`.
