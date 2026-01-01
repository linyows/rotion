import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  FetchBlocks,
  FetchDatabase,
  FetchPage,
  type FetchBlocksRes,
  type RichTextItemResponse,
  type TitlePropertyItemObjectResponse,
} from 'rotion'
import { Header } from '@/components/Header'
import { Page } from '@/components/Page'
import styles from './article.module.css'

type Props = {
  databaseTitle: string
  title: null | RichTextItemResponse
  icon: string
  blocks: FetchBlocksRes
}

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID || ''
  const db = await FetchDatabase({ database_id: databaseId })

  const paths = db.results.map((page) => ({
    params: { id: page.id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string
  const databaseId = process.env.NOTION_DATABASE_ID || ''

  const [page, db] = await Promise.all([
    FetchPage({ page_id: id, last_edited_time: 'force' }),
    FetchDatabase({ database_id: databaseId })
  ])

  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }

  const icon = page.icon?.src || ''
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
  const databaseTitle = db.meta?.title?.[0]?.plain_text || 'Database'

  return {
    props: {
      databaseTitle,
      title,
      icon,
      blocks,
    }
  }
}

export default function Article({ databaseTitle, title, icon, blocks }: InferGetStaticPropsType<typeof getStaticProps>) {
  const titleText = title?.plain_text

  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <Header title={databaseTitle} />
      <div className={styles.container}>
        {icon && <Image src={icon} width={160} height={160} alt="Icon" className="page-icon" />}
        <h1 className={styles.title}>{titleText}</h1>
        <Page blocks={blocks} />
        <div className={styles.back}>
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </>
  )
}
