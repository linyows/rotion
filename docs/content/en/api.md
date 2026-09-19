# API

Everything on this page is imported from `rotion`. These functions run in Node.js, at build time or on a server (see [Server rendering](server-rendering)); they read `NOTION_TOKEN` and the other variables in [Configuration](configuration) when the module is loaded.

```ts
import { FetchDatabase, FetchPage, FetchBlocks, FetchBreadcrumbs } from 'rotion'
```

All fetch functions cache their results in `.cache` and download files into `public/`; [Caching](caching) describes when a cached result is used. A failed Notion request is retried as described in [Caching](caching#rate-limits-and-retries), and then thrown as an `Error` whose message names the API method, the error code and message from Notion, and the arguments. The original error is in `cause`.

## FetchDatabase

```ts
function FetchDatabase(args: FetchDatabaseArgs): Promise<FetchDatabaseRes>

interface FetchDatabaseArgs extends Omit<QueryDataSourceParameters, 'data_source_id'> {
  database_id: string
}
```

Queries a database and returns all matching pages.

`args` is `database_id` plus the parameters of the Notion API's data source query, such as `filter`, `sorts` and `page_size`. Rotion retrieves the database, uses its first data source, and queries it, following `next_cursor` until every page is fetched. With `page_size`, only the first page of results is fetched.

Before the query, `filter` and `sorts` are checked against the database's properties with [`validateQuery`](#validatequery). If a problem is found, `FetchDatabase` throws without sending the query. `ROTION_SKIP_QUERY_VALIDATION=true` skips the check. It also throws when the database has no data source.

The result, `FetchDatabaseRes` (the same shape as `QueryDatabaseResponseEx`), is the query response with these additions:

| Field | Description |
|-------|-------------|
| `results` | `PageObjectResponseEx[]`: every page, with `cover.src` and `icon.src` set to the downloaded files, and `avatar` set on each user of a people property. |
| `meta` | `GetDatabaseResponseEx`: the database, with `properties` (the property definitions of its data source) and `cover.src` / `icon.src`. |

A Notion built-in icon (`icon.type === 'icon'`) is downloaded as an SVG and replaced with an `external` icon that has `src`.

## FetchPage

```ts
function FetchPage(args: FetchPageArgs): Promise<FetchPageRes>

interface FetchPageArgs {
  page_id: string
  last_edited_time?: string
}
```

Retrieves a page and the values of its properties.

The result, `FetchPageRes` (`GetPageResponseEx`), is the page object with:

| Field | Description |
|-------|-------------|
| `meta` | Property values retrieved one by one from the property API and joined into one list response: `meta.object === 'list'` and `meta.results` holds the items. Only properties that the API returns as a list (title, rich text, relation, people, rollup) are included, one item per segment or entry. The other values are in `properties`, as in any page object. |
| `cover.src`, `icon.src` | Local paths of the downloaded cover and icon. |

`last_edited_time` is used only with the incremental cache: the cached page is returned when it equals the cached page's `last_edited_time`. `'force'` never matches, so it always requests the page. Without `last_edited_time`, the cached page is always returned.

## FetchBlocks

```ts
function FetchBlocks(args: FetchBlocksArgs): Promise<FetchBlocksRes>

interface FetchBlocksArgs {
  block_id: string
  last_edited_time?: string
}
```

Retrieves the content of a page (or the children of any block) and everything needed to render it. Pass the result to [`<Page>`](components#page).

The result, `FetchBlocksRes` (`ListBlockChildrenResponseEx`), is the list of child blocks, with every page of results joined into `results`. When `last_edited_time` is given, it is stored on the result as `last_edited_time` and compared on the next call if the incremental cache is on; use the page's value, not `'force'` (see [Caching](caching#incremental-cache)).

Rotion adds these fields to blocks:

| Block type | Added fields |
|------------|--------------|
| `bulleted_list_item`, `numbered_list_item`, `callout`, `toggle`, `table`, `synced_block` | `children`: the nested blocks, fetched with `FetchBlocks`. A synced block that is a copy fetches the original's children. |
| `column_list` | `children` (the columns) and `columns`: one block list per column. |
| `child_page` | `page`: the child page, fetched with `FetchPage`. |
| `child_database` | `database`: the database object. |
| `breadcrumb` | `list`: the page's breadcrumbs, from `FetchBreadcrumbs`. |
| `image` | `image.src`, `image.width`, `image.height`: the downloaded image and its size. |
| `file`, `pdf` | `src` and `size` (bytes) of the downloaded file. |
| `video` | For an uploaded video, `video.src` and `video.videoType`; for an external video, `video.html` with the embed code. |
| `bookmark` | `bookmark.site`: `title`, `desc`, `image` and `icon` read from the target page. |
| `embed` | `embed.html`: the embed code for supported services. Google Maps needs `GOOGLEMAP_KEY`. |
| `link_preview` | `link_preview.github` (issue, pull request or repository details) or `link_preview.figma` (embed code). |
| `callout` | `callout.icon.src` for an external image or a built-in icon. |
| `paragraph` | Page and database mentions get `name` and `icon`. |

A failure while resolving one block (a download or a metadata request, for example) is skipped, so the block is rendered without the added field.

## FetchBreadcrumbs

```ts
function FetchBreadcrumbs(props: FetchBreadcrumbsProps): Promise<Breadcrumb[]>

interface FetchBreadcrumbsProps {
  type: 'page_id' | 'database_id' | 'block_id' | 'workspace' | 'data_source_id' | 'agent_id'
  id: string
  limit?: number
}

type Breadcrumb = {
  id: string
  name: string
  icon?: MentionIcon
}
```

Follows the parents of a page, database or block and returns them from the top down, ending with the object itself when it is a page or database. `limit` (default 5) caps the number of entries. The walk stops at the workspace and at a data source, which is the parent of database rows. Errors end the walk and return what was collected. Icons are downloaded; an emoji icon has `emoji`, other icons have `src`.

```ts
const breadcrumbs = await FetchBreadcrumbs({ type: 'page_id', id: 'YOUR_PAGE_ID' })
```

Render the result with [`<Breadcrumbs>`](components#breadcrumbs).

## validateQuery

```ts
function validateQuery(args: ValidateQueryArgs): string[]

interface ValidateQueryArgs {
  properties?: QueryProperties
  filter?: unknown
  sorts?: unknown
}

type QueryProperties = Record<string, DatabasePropertyConfigResponse>
```

Checks a database query against the database's property definitions and returns one message per problem; an empty array means no problem was found. `FetchDatabase` calls it before every query. It reports:

- a filter or sort that names a property that does not exist (a property ID is accepted as well as a name),
- a filter condition whose type does not fit the property, such as `select` on a `multi_select` property,
- an `equals`, `does_not_equal`, `contains` or `does_not_contain` value that is not an option of a select, multi-select or status property,
- `and` / `or` that is not an array, a filter without `property`, and a sort without `property` or `timestamp`.

Timestamp filters and sorts are not checked. When `properties` is empty or missing, nothing is checked.

```ts
function buildQueryValidationMessage(target: string, errors: string[]): string
```

Formats the messages of `validateQuery` into the error text `FetchDatabase` throws.

## Lower-level helpers

These are exported because the fetch functions use them, and are rarely needed directly. Each downloads the image and sets `src` on the object passed in; a failed download is ignored.

| Function | Description |
|----------|-------------|
| `savePageCover(page)` | Downloads a page's cover. |
| `savePageIcon(page)` | Downloads a page's icon. A built-in Notion icon is replaced with an `external` icon. |
| `saveDatabaseCover(db)` | Downloads a database's cover. |
| `saveDatabaseIcon(db)` | Downloads a database's icon, as `savePageIcon` does. |
| `getNotionIconUrl(icon)` | Returns the URL of a built-in Notion icon's SVG, given its `name` and `color`. |

## Types

`rotion` re-exports every type of the Notion SDK's API endpoints (`RichTextItemResponse`, `PageObjectResponse`, `TitlePropertyItemObjectResponse`, `QueryDataSourceParameters` and so on), together with Rotion's extended types. The ones you will use most:

| Type | Description |
|------|-------------|
| `QueryDatabaseResponseEx` | What `FetchDatabase` returns; the `db` prop of the database views. |
| `PageObjectResponseEx` | One row in `QueryDatabaseResponseEx['results']`. |
| `GetDatabaseResponseEx` | A database with downloaded cover and icon and its `properties`. |
| `GetPageResponseEx` | What `FetchPage` returns. |
| `ListBlockChildrenResponseEx` | What `FetchBlocks` returns; the `blocks` prop of `<Page>`. |
| `BlockObjectResponse` | One block, including Rotion's added fields. |
| `Breadcrumb` | One entry of `FetchBreadcrumbs`. |
| `DatabaseProperty` | A property value of a database row. |
