import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/list.module.css'

import {
  QueryDatabaseResponseEx,
  FetchDatabase,
  RichTextItemResponse,
  QueryDatabaseParameters,
} from '../src/server'

import {
  List,
  TextBlock,
} from '../src/components'

type Props = {
  title: null|RichTextItemResponse[]
  desc: null|RichTextItemResponse[]
  icon: string
  image: string
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const params = {
    database_id: process.env.NOTION_TESTDB_ID as string,
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

  const title = ('title' in db.meta) ? db.meta.title : null
  const icon = ('icon' in db.meta && db.meta.icon !== null && db.meta.icon.type === 'emoji') ? db.meta.icon.emoji : ''
  const image = ('cover' in db.meta && db.meta.cover !== null && db.meta.cover.type === 'external') ? db.meta.cover.external.url : ''
  const desc = ('description' in db.meta) ? db.meta.description : null

  return {
    props: {
      title,
      desc,
      icon,
      image,
      db,
    }
  }
}

const ListPage: NextPage<Props> = ({ title, desc, icon, image, db }) => {
  const bg = {
    backgroundImage: `url("${image}")`
  }

  return (
    <>
      <Head>
        <title>List - Notionate</title>
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`} />
      </Head>

      <header className={styles.header}>
        <div className={styles.cover} style={bg}>
        </div>
        <div className={`${styles.headerInner} ${styles.wrapper}`}>
          <div className={styles.icon}>
            {icon}
          </div>
          <h1 className={styles.title}>
            {title && <TextBlock tag="span" block={title} />}
          </h1>
        </div>
        <p className={`${styles.desc} ${styles.wrapper}`}>
          {desc && <TextBlock tag="span" block={desc} />}
        </p>
      </header>

      <div className={`${styles.db} ${styles.wrapper}`}>
        <List keys={['Name', 'Note', 'spacer', 'Tags', 'Url', 'Born', 'Date']} db={db} link="/database/[id]" />
      </div>
    </>
  )
}

export default ListPage
