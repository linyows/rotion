import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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
  const id = process.env.NOTION_PAGE_ID || ''
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
  const titleText = title?.plain_text
  return (
    <>
      <Head>
        <title>{titleText}</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>
      <div className="content">
        <Image src={icon} width={160} height={160} alt="Icon" className="page-icon" />
        <h1 className="page-title">{titleText}</h1>
        <Page blocks={blocks} href="/[title]" link={Link as NLink} />
      </div>
    </>
  )
}
