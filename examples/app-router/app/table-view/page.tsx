import Image from 'next/image'
import { Metadata } from 'next'
import styles from '../styles/Db.module.css'
import Header from '../components/Header'

import {
  FetchDatabase,
  FetchDatabaseArgs,
  FetchPage,
  FetchBlocks,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
  FetchBreadcrumbs,
} from 'rotion'

import {
  Table,
  Page,
  RichText,
} from 'rotion/ui'

export const metadata: Metadata = {
  title: 'Table view - Rotion',
}

export default async function TablePage() {
  const id = process.env.NOTION_TABLEPAGE_ID as string
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })

  let title: null|RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }

  const icon = page.icon!.src
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
  const breadcrumbs = await FetchBreadcrumbs({ id, type: 'page_id' })

  const params: FetchDatabaseArgs = {
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
  }
  const db = await FetchDatabase(params)

  return (
    <>
      <Header breadcrumbs={breadcrumbs} breadcrumb_hrefs={['/', '/[name]']} />

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
            <Table
              keys={['Name', 'Date', 'Tags', 'Url', 'Note', 'Born', 'Category']}
              db={db}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
