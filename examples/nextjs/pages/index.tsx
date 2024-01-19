import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Page.module.css'
import Header, { Breadcrumb } from '@/components/Header'

import {
  FetchBlocks,
  FetchPage,
  ListBlockChildrenResponseEx,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
} from 'rotion'

import {
  Page,
  RichText,
  Link as NLink,
} from 'rotion/ui'

type Props = {
  title: null | RichTextItemResponse
  icon: string
  blocks: ListBlockChildrenResponseEx
  breadcrumbs: Breadcrumb[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTROOT_ID as string
  const page = await FetchPage(id, 'force')
  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = page.icon!.src
  const blocks = await FetchBlocks(id, page.last_edited_time)
  const breadcrumbs = [{ name: 'Notionate', icon, href: '/' }]

  return {
    props: {
      title,
      icon,
      blocks,
      breadcrumbs,
    }
  }
}

const Home: NextPage<Props> = ({ title, icon, blocks, breadcrumbs }) => {
  return (
    <>
      <Head>
        <title>Notionate</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>

      <Header breadcrumbs={breadcrumbs} />

      <div className={styles.layout}>
        <span></span>
        <div>
          <header className={styles.header}>
            <div className={styles.icon}>
              <Image src={icon} width={78} height={78} alt="Icon" />
            </div>
            <h1 className={styles.title}>
              {title && <RichText textObject={title} />}
            </h1>
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

export default Home
