<p align="center">
  <a href="https://rotion.linyo.ws">
    <picture><br><br><br>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/linyows/rotion/blob/main/misc/rotion-dark-bg.svg?raw=true">
      <img alt="Rotion" src="https://github.com/linyows/rotion/blob/main/misc/rotion.svg?raw=true" width="300">
    </picture><br><br><br>
  </a>
</p>

<strong>Rotion</strong> makes it easy to generate a Static Website using React and the Notion API.
Therefore, images and other necessary files are stored locally. Basically, it is designed to use Next.js, but it will work with other frameworks as well.

<p align="center">
  <a href="https://github.com/linyows/rotion/actions" title="actions">
    <img alt="Actions" src="https://img.shields.io/github/actions/workflow/status/linyows/rotion/build.yml?branch=main&style=for-the-badge&labelColor=000000">
  </a>
  <a href="https://www.npmjs.com/package/rotion" title="npm">
    <img alt="NPM" src="http://img.shields.io/npm/v/rotion.svg?style=for-the-badge&labelColor=000000">
  </a>
</p>

Example
--

Take a look at the website built with rotion.

- Website built with rotion: https://rotion.linyo.ws
- Published pages on Notion: https://linyows.notion.site/rotion-6d6150cf068f4293a78b6fd9fa8d0181

Usage
--

Use API calls and components together. This is database list example:

```ts
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { FetchDatabase, QueryDatabaseResponseEx, QueryDatabaseParameters } from 'rotion'
import { List } from 'rotion/ui'

type Props = {
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const db = await FetchDatabase({
    database_id: process.env.NOTION_DBID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      },
    ]
  } as QueryDatabaseParameters)

  return {
    props: {
      db,
    }
  }
}

export default const DB: NextPage<Props> = ({ db }) => {
  return (
    <List keys={['Name', 'spacer', 'Tags', 'Date']} db={db} href="/animals/[id]" link={Link} />
  )
}
```

This is page example:

```ts
import type { GetStaticProps, NextPage } from 'next'
import { FetchBlocks, ListBlockChildrenResponseEx } from 'rotion'
import { Page } from 'rotion/ui'

type Props = {
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const blocks = await FetchBlocks({ block_id: process.env.NOTION_PAGEID })
  return {
    props: {
      blocks,
    }
  }
}

export default const Page: NextPage<Props> = ({ blocks }) => {
  return (
    <Page blocks={blocks} />
  )
}
```

Set the notion token as environment variable:

```sh
$ cat .env
NOTION_TOKEN=secret_vHVKhIeYm95ga1sjOv*************************
NOTION_PAGEID=23740912-d6ac-4018-ab76-c64e772a342a
NOTION_DBID=81781536-afc6-431d-a217-21177e7bf8e0
```

Notion ID is UUIDv4 format: 8-4-4-4-12.


Env name                    | Description                                                   | Default
---                         | ---                                                           | ---
NOTION_TOKEN *requirement   | Read permission is required in notion's credentials           | -
ROTION_CACHEDIR             | Cache directory name                                          | .cache
ROTION_DOCROOT              | Web server root directory                                     | public
ROTION_IMAGEDIR             | Web server image directory                                    | images
ROTION_INCREMENTAL_CACHE    | Enable incremental cache                                      | false
ROTION_WAITTIME             | milliseconds to wait right after api request due to ratelimit | 0
ROTION_LIMITED_WAITTIME     | milliseconds to wait before backoff after ratelimit limit     | 60sec
ROTION_WEBP_QUALITY         | Quality for WebP converting                                   | 95
ROTION_DEBUG                | Logging level to debug                                        | -

API
--

This is the API available:

- FetchDatabase: Returns page list and properties in database
- FetchPage: Returns page title and properties
- FetchBlocks: Returns blocks that is the content of the page.
- FetchBreadcrumbs: Returns title and icons for breadcrums

Images are saved in `ROTION_IMAGEDIR` locally.

Components
--

This is the components available:

- [x] Page Blocks
- [x] Database List View
- [x] Database Gallery View
- [x] Database Table View
- [ ] Database Calendar View
- [ ] Database Timeline View

Author
--

[@linyows](https://github.com/linyows)
