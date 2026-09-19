# Database views

A Notion database is fetched with `FetchDatabase` and shown with one of four components: `Table`, `List`, `Gallery` and `Calendar`. Each has a live example on its showcase page: [Table](views/table), [List](views/list), [Gallery](views/gallery) and [Calendar](views/calendar).

## Fetch a database

```ts
import { FetchDatabase } from 'rotion'

const db = await FetchDatabase({ database_id: 'YOUR_DATABASE_ID' })
```

`FetchDatabase` takes the database ID plus the arguments of the Notion API's [data source query](https://developers.notion.com/reference/query-a-data-source), except `data_source_id`, which Rotion fills in: it retrieves the database, takes its first data source, and queries that. Every page of results is fetched and joined into `db.results`. The database itself (title, icon, cover, property definitions) is in `db.meta`.

Filters and sorts use the Notion API's format:

```ts
const db = await FetchDatabase({
  database_id: 'YOUR_DATABASE_ID',
  filter: {
    and: [
      { property: 'Published', checkbox: { equals: true } },
      { property: 'Tags', multi_select: { contains: 'Release' } },
    ],
  },
  sorts: [
    { property: 'Date', direction: 'descending' },
  ],
})
```

Before sending the query, Rotion checks the filter and sorts against the database's properties. A property name that does not exist, a condition that does not match the property's type (`select` on a `multi_select` property, for example), or an option name that the select, multi-select or status property does not have makes `FetchDatabase` throw an error that names the problem and lists what is available. The Notion API would reject such a query with a message that does not say which part is wrong. Set `ROTION_SKIP_QUERY_VALIDATION=true` to turn the check off.

`page_size` limits the result to one page of that size; Rotion then does not follow `next_cursor`.

Each distinct set of arguments has its own cache file, so fetching the same database with two filters makes two cache entries. See [Caching](caching) for when a cached query is fetched again.

Along with the query, Rotion downloads each row's cover and icon, the avatars of people properties, and the database's own cover and icon, and adds the local path to them as `src`.

## Choosing properties with keys

Every view takes `keys`, the names of the properties to show, in order. A name that is not a property of the database renders nothing (in a table, a column with a header and empty cells). The views render these property types:

| Property type | Table | List | Gallery | Calendar |
|---------------|:-----:|:----:|:-------:|:--------:|
| `title` | ✓ | ✓ | ✓ | ✓ |
| `rich_text` | ✓ | ✓ | ✓ | ✓ |
| `select` | ✓ | ✓ | ✓ | ✓ |
| `multi_select` | ✓ | ✓ | ✓ | ✓ |
| `date` | ✓ | ✓ | ✓ | |
| `number` | ✓ | ✓ | ✓ | |
| `checkbox` | ✓ | ✓ | ✓ | |
| `url` | ✓ | ✓ | ✓ | |
| `formula` (number result) | ✓ | ✓ | ✓ | |

Other property types are not rendered. A formula is shown only when its result is a number.

## Links: href, link and query

All four views share three options for turning values into links.

- `href`: an object from property name to path.
  - On the **title** property, the path is the link of the row. `[id]` in the path is replaced with the page ID (`'/posts/[id]'` → `/posts/1429989f-...`). Any other name in brackets is replaced with the text of that `rich_text` property, which lets a `Slug` property decide the URL (`'/posts/[Slug]'`). A path without brackets is used as it is.
  - On a **select** or **multi_select** property, each option becomes a link to the path plus `/` and the URL-encoded option name (`{ Tags: '/tags' }` → `/tags/Release`).
- `link`: the component used for these links instead of `<a>`, such as `next/link`. In the App Router, pass a wrapper made with `createClientLink`; see [App Router](app-router#wrap-nextlink-with-createclientlink).
- `query`: query parameters added to each link, passed to `link` as `href={{ pathname, query }}`. It is applied only when `link` is set.

```tsx
<Table
  db={db}
  keys={['Title', 'Tags', 'Date']}
  options={{
    href: { Title: '/posts/[Slug]', Tags: '/tags' },
    link: NextLink as Link,
  }}
/>
```

`prefix` and `suffix`, available on `Table`, `List` and `Gallery`, are objects from property name to a string shown before or after the value. They apply to number, checkbox and formula properties, for units like `{ Price: '$' }` or `{ Duration: 'min' }`.

## Table

```tsx
import { Table } from 'rotion/ui'

<Table db={db} keys={['Title', 'Tags', 'Date']} options={{ verticalLines: false }} />
```

| Prop | Type | Description |
|------|------|-------------|
| `db` | `QueryDatabaseResponseEx` | The value `FetchDatabase` returns. |
| `keys` | `string[]` | Properties to show, one column each. The header shows each name with an icon for its type. |
| `options` | `TableOptions` | See below. |

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `href` | `{ [key: string]: string }` | | Links, as described above. |
| `link` | `Link` | | Link component. |
| `query` | `ParsedUrlQueryInput` | | Query parameters for links. |
| `prefix` | `{ [key: string]: string }` | | Text before a value. |
| `suffix` | `{ [key: string]: string }` | | Text after a value. |
| `verticalLines` | `boolean` | `true` | Draw borders between columns. |

Columns get the class names `rotion-table-column0`, `rotion-table-column1`, … so you can size them with CSS.

## List

```tsx
import { List } from 'rotion/ui'

<List db={db} keys={['Title', 'spacer', 'Tags', 'Date']} />
```

A list shows one row per page, with the values of `keys` side by side. Two names in `keys` are not properties:

- `spacer` takes up the free width, which pushes the keys after it to the right edge.
- `dashed` does the same and draws a dashed line across the space.

| Prop | Type | Description |
|------|------|-------------|
| `db` | `QueryDatabaseResponseEx` | The value `FetchDatabase` returns. |
| `keys` | `string[]` | Properties to show, plus `spacer` or `dashed`. |
| `options` | `ListOptions` | `href`, `link`, `query`, `prefix`, `suffix`, as described above. |

## Gallery

```tsx
import { Gallery } from 'rotion/ui'

<Gallery
  db={db}
  keys={['Title', 'Tags']}
  options={{
    href: { Title: '/posts/[id]' },
    image: { size: 'large', fit: false },
  }}
/>
```

A gallery shows one card per page, with the page's cover image at the top. When the title property has an `href`, the whole card is the link.

| Prop | Type | Description |
|------|------|-------------|
| `db` | `QueryDatabaseResponseEx` | The value `FetchDatabase` returns. |
| `keys` | `string[]` | Properties to show on each card. |
| `options` | `GalleryOptions` | `href`, `link`, `query`, `prefix`, `suffix`, and `image`. |

`image` controls the cards and their cover image:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Card size. Cards are at least 180px, 260px or 320px wide, and the cover is 100px, 146px or 180px high. |
| `fit` | `boolean` | `true` | `true` shows the whole cover inside the box (`object-fit: contain`); `false` fills the box and crops the image (`object-fit: cover`). |
| `preview` | `'cover' \| 'content'` | `'cover'` | Only `'cover'` is implemented: the card shows the page cover, if the page has one. |

The column widths come from the CSS variables `--rotion-gallery-grid-template-columns-small`, `-medium` and `-large`, which you can override.

## Calendar

```tsx
import { Calendar } from 'rotion/ui'

<Calendar
  db={db}
  date="Date"
  keys={['Name', 'Tags']}
  options={{
    initialDate: '2026-04-01',
    weekStart: 'monday',
    locale: 'ja-JP',
    href: { Name: '/events/[id]' },
  }}
/>
```

A calendar places each page on a monthly grid by one of its date properties, and has buttons to move between months and back to today. An event with both a start and an end date is drawn as one bar across the days it covers, continuing onto the next week's row when it crosses a week boundary. Pages whose date property is empty are not shown.

| Prop | Type | Description |
|------|------|-------------|
| `db` | `QueryDatabaseResponseEx` | The value `FetchDatabase` returns. |
| `date` | `string` | Name of the date property that places events. Required. |
| `keys` | `string[]` | Properties shown inside each event. The title is always shown first, even when it is not in `keys`; `title`, `rich_text`, `select` and `multi_select` are rendered. |
| `options` | `CalendarOptions` | See below. |

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `initialDate` | `string` | today | The month shown first, as `YYYY-MM-DD` or `YYYY-MM`. |
| `weekStart` | `'sunday' \| 'monday'` | `'sunday'` | First day of the week. |
| `locale` | `string` | the browser's language | Locale for the month and weekday labels. |
| `href` | `{ [key: string]: string }` | | Only the title property's entry is used; it links the whole event. |
| `link` | `Link` | | Link component. |
| `query` | `ParsedUrlQueryInput` | | Query parameters for links. |

Without `initialDate`, the calendar starts at the month of the date it is rendered on. For a static page that is the build date in the generated HTML, which can differ from the viewer's date, so set `initialDate` when the starting month matters. Dates are compared as calendar days; the time part of a date is ignored.
