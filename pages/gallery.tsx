import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import styles from '../styles/db.module.css'

import {
  QueryDatabaseResponseEx,
  FetchDatabase,
  FetchPage,
  FetchBlocks,
  RichTextItemResponse,
  QueryDatabaseParameters,
  ListBlockChildrenResponseEx,
  TitlePropertyItemObjectResponse,
} from '../src/server'

import {
  Gallery,
  Blocks,
  TextObject,
} from '../src/components'

type Props = {
  title: null|RichTextItemResponse
  icon: string
  image: string
  blocks: ListBlockChildrenResponseEx
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_GALLERYPAGE_ID as string
  const page = await FetchPage(id, 'force')
  let title: null|RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = ('icon' in page && 'emoji' in page.icon) ? page.icon.emoji : ''
  const image = ('cover' in page) ? page.cover.src : ''
  const blocks = await FetchBlocks(id, page.last_edited_time)

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
      image,
      blocks,
      db,
    }
  }
}

const GalleryPage: NextPage<Props> = ({ title, icon, image, blocks, db }) => {
  const position = {
    objectPosition: 'center 0%',
  }
  return (
    <>
      <Head>
        <title>Gallery - Notionate</title>
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`} />
      </Head>

      <header className={styles.header}>
        <img className={styles.cover} src={image} style={position} />
        <div className={`${styles.headerInner} ${styles.wrapper}`}>
          <div className={styles.icon}>
            {icon}
          </div>
          <h1 className={styles.title}>
            {title && <TextObject textObject={title} />}
          </h1>
        </div>
        <div className={`${styles.desc} ${styles.wrapper}`}>
          <Blocks blocks={blocks} />
        </div>
      </header>

      <div className={`${styles.db} ${styles.wrapper}`}>
        <Gallery
          keys={['Name', 'Date', 'Tags']}
          db={db}
          preview="cover"
          size="large"
          fit={true}
          href="/database/[id]"
        />
      </div>
    </>
  )
}

export default GalleryPage
