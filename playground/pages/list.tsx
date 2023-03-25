import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Db.module.css'
import {
  FetchDatabase,
  FetchPage,
  // types
  QueryDatabaseResponseEx,
  RichTextItemResponse,
  QueryDatabaseParameters,
  TitlePropertyItemObjectResponse,
  Link as NLink,
} from 'notionate'
import {
  List,
  TextBlock,
  TextObject,
} from 'notionate/dist/components'

type Props = {
  title: null|RichTextItemResponse
  desc:  null|RichTextItemResponse[]
  icon: string
  image: string
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const database_id = process.env.NOTION_TESTDB_ID as string
  const page_id = process.env.NOTION_LISTPAGE_ID as string
  const params = {
    database_id,
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
  } as QueryDatabaseParameters
  const db = await FetchDatabase(params)
  const page = await FetchPage(page_id)
  const image = ('cover' in page) ? page.cover.src : ''
  const icon = ('icon' in page && 'emoji' in page.icon) ? page.icon.emoji : ''
  let title: null|RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }

  const desc = ('description' in db.meta) ? db.meta.description : null
  const props = {
    title,
    desc,
    icon,
    image,
    db,
  }
  return { props }
}

const ListPage: NextPage<Props> = ({ title, desc, icon, image, db }) => {
  const bg = {
    backgroundImage: `url("${image}")`,
  }
  return (
    <>
      <Head>
        <title>List - Notionate</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.cover} style={bg}>
        </div>
        <div className={`${styles.headerInner} ${styles.wrapper}`}>
          <div className={styles.icon}>
            {icon}
          </div>
          <h1 className={styles.title}>
            {title && <TextObject textObject={title} />}
          </h1>
        </div>
        <p className={`${styles.desc} ${styles.wrapper}`}>
          <TextBlock tag="span" block={desc || undefined} />
        </p>
      </header>

      <div className={`${styles.db} ${styles.wrapper}`}>
        <List
          keys={['Name', 'Note', 'spacer', 'Tags', 'Url', 'Born', 'Date']}
          db={db}
          href="/database/[id]"
          link={Link as NLink}
        />
      </div>
    </>
  )
}

export default ListPage
