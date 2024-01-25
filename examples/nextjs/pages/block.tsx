import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Head from 'next/head'
import styles from '@/styles/Page.module.css'
import mermaid from 'mermaid'
import prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-sql'

import {
  FetchBlocks,
  FetchPage,
  ListBlockChildrenResponseEx,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
  FetchBreadcrumbs,
  Breadcrumb,
} from 'rotion'

import {
  Page,
  RichText,
} from 'rotion/ui'

type Props = React.PropsWithChildren & {
  title: null|RichTextItemResponse
  icon: string
  blocks: ListBlockChildrenResponseEx
  breadcrumbs: Breadcrumb[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTPAGE_ID as string
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

const BlocksPage: NextPage<Props> = ({ title, icon, blocks, breadcrumbs }) => {
  const [exModules, setExModules] = useState({ mermaid, prism })
  useEffect(() => {
    mermaid.initialize({ theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'neutral' })
    setExModules({ mermaid, prism })
  }, [])
  const hrefs = ['/', '/[name]']

  return (
    <>
      <Head>
        <title>Block - Rotion</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>

      <Header breadcrumbs={breadcrumbs} breadcrumb_hrefs={hrefs} />

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
            <Page blocks={blocks} modules={exModules} link={Link} breadcrumb_hrefs={hrefs} />
          </div>
        </div>
        <span></span>
      </div>
    </>
  )
}

export default BlocksPage
