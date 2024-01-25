import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Header, { Breadcrumb } from '@/components/Header'
import Head from 'next/head'
import styles from '@/styles/Page.module.css'

import {
  FetchBlocks,
  FetchPage,
  FetchBlocksRes,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
  FetchBreadcrumbs,
} from 'rotion'

import {
  Page,
  RichText,
} from 'rotion/ui'

type Props = React.PropsWithChildren & {
  title: null|RichTextItemResponse
  icon: string
  blocks: FetchBlocksRes
  breadcrumbs: Breadcrumb[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_RICHTEXT_PAGEID as string
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
  let title: null|RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta?.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = page.icon!.src
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
  const breadcrumbs = await FetchBreadcrumbs({ id, type: 'page_id' })

  return {
    props: {
      title,
      icon,
      blocks,
      breadcrumbs,
    }
  }
}

const RichTextPage: NextPage<Props> = ({ title, icon, blocks, breadcrumbs }) => {
  return (
    <>
      <Head>
        <title>Rich Text - Rotion</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>

      <Header breadcrumbs={breadcrumbs} breadcrumb_hrefs={['/', '/[name]']} />

      <div className={styles.layout}>
        <span></span>
        <div>
          <header className={styles.header}>
            <div className={styles.icon}>
              <Image src={icon} width={78} height={78} alt='Icon' />
            </div>
            <h1 className={styles.title}>
              {title && <RichText textObject={title} />}
            </h1>
          </header>

          <div className={`${styles.page} ${styles.wrapperPage}`}>
            <Page blocks={blocks} />
          </div>
        </div>
        <span></span>
      </div>
    </>
  )
}

export default RichTextPage
