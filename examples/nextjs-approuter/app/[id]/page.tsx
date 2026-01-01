import Image from 'next/image'
import {
  FetchBlocks,
  FetchDatabase,
  FetchPage,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
} from 'rotion'
import Link from 'next/link'
import { Page } from '../compornents/Page'
import styles from './page.module.css'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const databaseId = process.env.NOTION_DATABASE_ID || ''
  const db = await FetchDatabase({ database_id: databaseId })

  return db.results.map((page) => ({
    id: page.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })

  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }

  return {
    title: title?.plain_text || 'Article',
  }
}

export default async function Article({ params }: PageProps) {
  const { id } = await params
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })

  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }

  const icon = page.icon?.src
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
  const titleText = title?.plain_text

  return (
    <>
      {icon && <Image src={icon} width={160} height={160} alt="Icon" className="page-icon" />}
      <h1 className={styles.title}>{titleText}</h1>
      <Page blocks={blocks} />
      <div className={styles.back}>
        <Link href="/">Back to Home</Link>
      </div>
    </>
  )
}
