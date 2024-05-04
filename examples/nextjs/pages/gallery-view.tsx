import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Db.module.css'
import Header from '@/components/Header'

import {
  FetchDatabase,
  FetchDatabaseArgs,
  FetchDatabaseRes,
  FetchPage,
  FetchBlocks,
  FetchBlocksRes,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
  FetchBreadcrumbs,
  Breadcrumb,
} from 'rotion'

import {
  Gallery,
  Page,
  RichText,
} from 'rotion/ui'

type Props = {
  title: null|RichTextItemResponse
  icon: string
  blocks: FetchBlocksRes
  db: FetchDatabaseRes
  breadcrumbs: Breadcrumb[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_GALLERYPAGE_ID as string
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

const GalleryPage: NextPage<Props> = ({ title, icon, blocks, db, breadcrumbs }) => {
  return (
    <>
      <Head>
        <title>Gallery view - Rotioin</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>

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
            <Gallery
              keys={['Name', 'Date', 'Tags']}
              db={db}
              preview="cover"
              size="large"
              fit={true}
              href="/database/[id]"
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default GalleryPage
