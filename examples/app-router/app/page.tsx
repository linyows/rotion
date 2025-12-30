import Image from 'next/image'
import {
  FetchBlocks,
  FetchPage,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
} from 'rotion'

import { RotionPage } from './compornents/RotionPage'

export async function generateMetadata() {
  const id = process.env.NOTION_PAGE_ID || ''
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })

  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }

  return {
    title: title?.plain_text,
  }
}

export default async function Home() {
  const id = process.env.NOTION_PAGE_ID || ''
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })

  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }

  const icon = page.icon!.src
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
  const titleText = title?.plain_text

  return (
    <div className="content">
      <Image src={icon} width={160} height={160} alt="Icon" className="page-icon" />
      <h1 className="page-title">{titleText}</h1>
      <RotionPage blocks={blocks} />
    </div>
  )
}
