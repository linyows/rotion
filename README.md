Notionate
==

This is React components that uses the Notion API to display the Notion's database and page.

Usage
--

Use API calls and components together. This is atabase list example:

```ts
import type { GetStaticProps, NextPage } from 'next'
import {
  FetchDatabase,
  Querydatabaseresponse,
} from 'notionate'
import { DBList } from 'notionate/dist/components'

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
        {DBList({
          keys: ['Name', 'spacer', 'Tags', 'Date'],
          db: blog,
        })}
      </div>
    </section>
  )
}
```

API
--

This is the API available:

- FetchDatabase
- FetchPage
- FetchBlocks

Images are saved locally.

Author
--

[@linyows](https://github.com/linyows)
