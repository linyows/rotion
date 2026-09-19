import Image from 'next/image'
import Link from 'next/link'
import { FetchBlocks, FetchPage, type RichTextItemResponse, type TitlePropertyItemObjectResponse } from 'rotion'
import { Page } from '../compornents/Page'
import styles from './page.module.css'

// Render each page on its first request, then regenerate it at most once a minute
export const revalidate = 60

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })

  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find((v) => v.type === 'title') as TitlePropertyItemObjectResponse
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
    const obj = page.meta.results.find((v) => v.type === 'title') as TitlePropertyItemObjectResponse
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
