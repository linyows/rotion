<p align="center">
  <img alt="Notionate" src="https://github.com/linyows/notionate/blob/main/misc/notionate-icon.svg?raw=true" width="300">
</p>

<p align="center">
  <strong>Notionate</strong>: This is React components that uses the Notion API to display the Notion's database and page.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/notionate" title="npm"><img src="http://img.shields.io/npm/v/notionate.svg?style=for-the-badge"></a>
  <a href="https://github.com/linyows/notionate/actions" title="actions"><img src="https://img.shields.io/github/workflow/status/linyows/notionate/Build?style=for-the-badge"></a>
  <a href="https://github.com/linyows/notionate/blob/main/LICENSE"><img src="http://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

Example
--

- Notionate: https://notionate.linyo.ws
- Original: https://www.notion.so/linyows/Notionate-6d6150cf068f4293a78b6fd9fa8d0181

Usage
--

Use API calls and components together. This is database list example:

```ts
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import {
  FetchDatabase,
  Querydatabaseresponse,
} from 'notionate'
import { DBList } from 'notionate/dist/components'
import 'notionate/dist/styles/notionate.css'

type Props = { blog: QueryDatabaseResponse }

export const getStaticProps: GetStaticProps<Props> = async () => {
  const id = process.env.NOTION_DBID as string
  const blog = await FetchDatabase(id)
  return {
    props: { blog }
  }
}

export default const Home: NextPage<Props> = ({ blog }) => {
  return (
    <section>
      <div className="header">
        <h1>Blog</h1>
        <p>This is my blog list.</p>
      </div>

      <div className="list">
        <DBList
          keys={['Name', 'spacer', 'Tags', 'Date']}
          db={blog}
          link="/posts/[id]"
          LinkComp={Link}
        />
      </div>
    </section>
  )
}
```

API
--

This is the API available:

- FetchDatabase
- FetchBlocks

Images are saved locally.

Author
--

[@linyows](https://github.com/linyows)
