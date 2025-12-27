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
  List,
  Page,
  RichText,
} from 'rotion/ui'

export const metadata: Metadata = {
  title: 'List view - Rotion',
}

export default async function ListPage() {
  const id = process.env.NOTION_LISTPAGE_ID as string
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })

  let title: null|RichTextItemResponse = null
  if (page.meta && page.meta.object === 'list') {
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
            <List
              keys={['Name', 'spacer', 'Note', 'Tags', 'Url', 'Born', 'Date']}
              db={db}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
