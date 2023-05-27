import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Page.module.css'
import {
  FetchPage,
  FetchBlocks,
  // types
  RichTextItemResponse,
  ListBlockChildrenResponseEx,
  TitlePropertyItemObjectResponse,
  Link as NLink,
} from 'notionate'
import {
  TextObject,
  Blocks,
} from 'notionate/dist/components'
import React from 'react'

type Props = {
  title: null|RichTextItemResponse
  icon: string
  image: string
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTROOT_ID as string
  const page = await FetchPage(id)
  const obj = 'results' in page.meta! ? page.meta!.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse : null
  const title = obj ? obj.title : obj
  const icon = page.icon.type === 'emoji' ? page.icon.emoji : ''
  const image = page.cover.src
  const blocks = await FetchBlocks(id)
  const props = {
    title,
    icon,
    image,
    blocks,
  }
  return { props }
}

const Home: NextPage<Props> = ({ title, icon, image, blocks }) => {
  const bg = {
    backgroundImage: `url("${image}")`
  }

  return (
    <div>
      <Head>
        <title>Notionate</title>
      </Head>

      <header className={styles.header} style={bg}>
        <div className={styles.headerInner}>
          <div className={styles.icon}>
            {icon}
          </div>
          <h1 className={styles.title}>
            <TextObject textObject={title!} />
          </h1>
        </div>
      </header>

      <div className={styles.page}>
        <Blocks blocks={blocks} href="/[title]" link={Link as NLink} />
      </div>
    </div>
  )
}

export default Home
