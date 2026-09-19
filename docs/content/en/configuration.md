# Configuration

Rotion is configured with environment variables only. They are read once, when `rotion` is first imported, so set them before the build process starts: in `.env.local` for Next.js, in the CI job's environment, or on the command line.

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
| `ROTION_UA` | `<name>/<version>` of the `package.json` in the current directory | `User-Agent` header of those HTTP requests. Some sites answer differently depending on it; Rotion's own site builds with `ROTION_UA=curl`. |
| `ROTION_SKIP_QUERY_VALIDATION` | `false` | `true` sends database queries without checking the filter and sorts first. See [validateQuery](api#validatequery). |
| `ROTION_DEBUG` | `false` | `true` logs cache decisions, retries and download errors, and sets the Notion client's log level to debug. |
| `ROTION_SKIP_DOWNLOAD` | `false` | `true` returns image paths without downloading the images. Intended for Rotion's tests. |

Boolean variables are enabled only by the exact string `true`. Numeric values are parsed as integers.

> [!NOTE]
>
> Rotion reads `package.json` from the current working directory when it is imported, for the default `ROTION_UA`. Run the build from your project's root, where `package.json` is.

Paths in `ROTION_CACHEDIR` and `ROTION_DOCROOT` are relative to the current working directory as well.

## Variables used by the examples

`NOTION_DATABASE_ID`, used throughout these docs and in the [examples](examples), is not read by Rotion. The examples read it in their own code and pass it to `FetchDatabase`.
