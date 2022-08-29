Notionate
==

This is React components that uses the Notion API to display the Notion's database and page.

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
