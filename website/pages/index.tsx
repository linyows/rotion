import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import Image from 'next/image'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Page.module.css'
import Header from '@/components/Header'

import {
  FetchBlocks,
  FetchPage,
  FetchBlocksRes,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
  FetchBreadcrumbs,
  Breadcrumb,
} from 'rotion'

import {
  Page,
  RichText,
  Link as NLink,
} from 'rotion/ui'

type Props = {
  title: null | RichTextItemResponse
  icon: string
  logo: string
  blocks: FetchBlocksRes
  breadcrumbs: Breadcrumb[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTROOT_ID as string
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const logo = page.cover?.src || ''
  const icon = page.icon!.src
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
  const breadcrumbs = await FetchBreadcrumbs({ id, type: 'page_id' })

  return {
    props: {
      title,
      icon,
      logo,
      blocks,
      breadcrumbs,
    }
  }
}

export default function Home({ title, logo, icon, blocks, breadcrumbs }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Rotion</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>

      <Header breadcrumbs={breadcrumbs} breadcrumb_hrefs={['/']} />

      <div className={styles.layout}>
        <span></span>
        <div>
          <header className={styles.header}>
            <div className={styles.logo}>
              <h1><Image src={logo} width={360} height={360} alt="Rotion" /></h1>
            </div>
          </header>

          <div className={styles.page}>
            <Page blocks={blocks} href="/[title]" link={Link as NLink} />
          </div>
        </div>
        <span></span>
      </div>
    </>
  )
}
