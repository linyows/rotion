import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Db.module.css'
import Header, { Breadcrumb } from '@/components/Header'

import {
  QueryDatabaseResponseEx,
  FetchDatabase,
  FetchPage,
  FetchBlocks,
  RichTextItemResponse,
  QueryDatabaseParameters,
  ListBlockChildrenResponseEx,
  TitlePropertyItemObjectResponse,
} from 'rotion'

import {
  List,
  Page,
  RichText,
} from 'rotion/ui'

type Props = {
  title: null|RichTextItemResponse
  icon: string
  blocks: ListBlockChildrenResponseEx
  db: QueryDatabaseResponseEx
  breadcrumbs: Breadcrumb[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_LISTPAGE_ID as string
  const page = await FetchPage(id, 'force')
  let title: null|RichTextItemResponse = null
  if (page.meta && page.meta.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = page.icon!.src
  const blocks = await FetchBlocks(id, page.last_edited_time)
  const breadcrumbs = [
    { name: 'Notionate', icon, href: '/' },
    { name: 'List', icon, href: '/list' },
  ]

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

  return {
    props: {
      title,
      icon,
      blocks,
      db,
      breadcrumbs,
    }
  }
}

const ListPage: NextPage<Props> = ({ title, icon, blocks, db, breadcrumbs }) => {
  return (
    <>
      <Head>
        <title>List - Notionate</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>

      <Header breadcrumbs={breadcrumbs} />

      <div className={styles.layout}>
        <div></div>
        <div>
          <header className={styles.header}>
              <div className={styles.icon}>
                <Image src={icon} width={78} height={78} alt="Icon" />
              </div>
              <h1 className={styles.title}>
                {title && <RichText textObject={title} />}
              </h1>
            <div className={styles.desc}>
              <Page blocks={blocks} />
            </div>
          </header>

          <div className={styles.db}>
            <List
              keys={['Name', 'spacer', 'Note', 'Tags', 'Url', 'Born', 'Date']}
              db={db}
              href="/database/[id]"
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default ListPage
