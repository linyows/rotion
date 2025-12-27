import Image from 'next/image'
import { Metadata } from 'next'
import styles from './styles/Page.module.css'
import Header from './components/Header'
import { ClientLink } from './lib/rotion'

import {
  FetchBlocks,
  FetchPage,
  FetchBreadcrumbs,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
} from 'rotion'

import { Page, Link as NLink } from 'rotion/ui'

export const metadata: Metadata = {
  title: 'Rotion - Next.js App Router Example',
}

export default async function Home() {
  // In App Router, data fetching can be done directly in Server Components
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

  return (
    <>
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
            <Page blocks={blocks} href="/[title]" link={ClientLink as NLink} />
          </div>
        </div>
        <span></span>
      </div>
    </>
  )
}
