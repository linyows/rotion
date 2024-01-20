<p align="center">
  <img alt="ROTION" src="https://github.com/linyows/rotion/blob/main/misc/rotion.svg?raw=true" width="300">
</p>

<p align="center">
  <strong>ROTION</strong>: This is react components that uses the notion api to display the notion's database and page.
</p>

<p align="center">
  <a href="https://github.com/linyows/rotion/actions" title="actions"><img src="https://img.shields.io/github/actions/workflow/status/linyows/rotion/build.yml?branch=main&style=for-the-badge"></a>
  <a href="https://www.npmjs.com/package/rotion" title="npm"><img src="http://img.shields.io/npm/v/rotion.svg?style=for-the-badge"></a>
  <a href="https://github.com/linyows/rotion/blob/main/LICENSE"><img src="http://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

Example
--

- rotion: https://rotion.linyo.ws
- Original: https://linyows.notion.site/rotion-6d6150cf068f4293a78b6fd9fa8d0181

Usage
--

Use API calls and components together. This is database list example:

```ts
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import {
  QueryDatabaseResponseEx,
  FetchDatabase,
  QueryDatabaseParameters,
  Link as NLink,
} from 'rotion'
import { DBList } from 'rotion/dist/components'
import 'rotion/dist/styles/rotion.css'
// Import when enable dark-mode
import 'rotion/dist/styles/rotion-dark.css'

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
    <>
      <List
        keys={['Name', 'spacer', 'Tags', 'Date']}
        db={db}
        href="/database/[id]"
        link={Link as NLink} />
    </>
  )
}
```

This is page example:

```ts
import type { GetStaticProps, NextPage } from 'next'
import { FetchBlocks, ListBlockChildrenResponseEx } from 'rotion'
import { Blocks } from 'rotion/dist/components'
import 'rotion/dist/styles/rotion.css'
// Import when enable dark-mode
import 'rotion/dist/styles/rotion-dark.css'

type Props = {
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const blocks = await FetchBlocks(process.env.NOTION_PAGEID)
  return {
    props: {
      blocks,
    }
  }
}

export default const Page: NextPage<Props> = ({ blocks }) => {
  return (
    <>
      <Blocks blocks={blocks} />
    </>
  )
}
```

Set the notion token as environment variable:

```sh
$ cat .env
NOTION_TOKEN=secret_vHVKhIeYm95ga1sjOv*************************
NOTION_PAGEID=23740912d6ac4018ab76c64e772a342a
NOTION_DBID=81781536afc6431da21721177e7bf8e0
```

Env name                    | Description                                                   | Default
---                         | ---                                                           | ---
NOTION_TOKEN                | Read permission is required in notion's credentials           | -
ROTION_CACHEDIR             | Cache directory name                                          | .cache
ROTION_DOCROOT              | Web server root directory                                     | public
ROTION_IMAGEDIR             | Web server image directory                                    | images
ROTION_INCREMENTAL_CACHE    | Enable incremental cache                                      | false
ROTION_WAITTIME             | milliseconds to wait right after api request due to ratelimit | 0
ROTION_LIMITED_WAITTIME     | milliseconds to wait before backoff after ratelimit limit     | 60sec
ROTION_WEBP_QUALITY         | Quality for WebP converting                                   | 95

API
--

This is the API available:

- FetchDatabase: Returns page list and properties in database
- FetchPage: Returns page title and properties
- FetchBlocks: Returns blocks that is the content of the page.

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
