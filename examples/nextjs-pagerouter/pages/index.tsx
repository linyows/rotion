import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import Head from 'next/head'
import {
  FetchDatabase,
  type QueryDatabaseResponseEx,
} from 'rotion'
import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import styles from './index.module.css'

type Props = {
  databaseTitle: string
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const databaseId = process.env.NOTION_DATABASE_ID || ''
  const db = await FetchDatabase({ database_id: databaseId })
  const databaseTitle = db.meta?.title?.[0]?.plain_text || 'Database'

  return {
    props: {
      databaseTitle,
      db,
    }
  }
}

export default function Home({ databaseTitle, db }: InferGetStaticPropsType<typeof getStaticProps>) {
  const description = 'This is a rotion example of the Notion database.'
  const keys = ['Title', 'Tags', 'Date']

  return (
    <>
      <Head>
        <title>{databaseTitle}</title>
      </Head>
      <Header title={databaseTitle} />
      <div className={styles.container}>
        <p className={styles.description}>{description}</p>
        <Table keys={keys} db={db} />
      </div>
    </>
  )
}
