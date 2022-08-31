import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/blocks.module.css'

import {
  FetchBlocks,
  FetchPage,
  ListBlockChildrenResponseEx,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
} from '../src/server'

import {
  Blocks,
  TextObject,
} from '../src/components'

type Props = {
  title: null|RichTextItemResponse
  icon: string
  image: string
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTROOT_ID as string
  const page = await FetchPage(id)
  let title: null|RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = ('emoji' in page.icon) ? page.icon.emoji : ''
  const image = page.cover.src
  const blocks = await FetchBlocks(id)

  return {
    props: {
      title,
      icon,
      image,
      blocks,
    }
  }
}

const Home: NextPage<Props> = ({ title, icon, image, blocks }) => {
  const bg = {
    backgroundImage: `url("${image}")`
  }

  return (
    <>
      <Head>
        <title>Notionate</title>
      </Head>

      <header className={styles.header} style={bg}>
        <div className={styles.headerInner}>
          <div className={styles.icon}>
            {icon}
          </div>
          <h1 className={styles.title}>
            {title && <TextObject textObject={title} />}
          </h1>
        </div>
      </header>

      <div className={styles.page}>
        <Blocks blocks={blocks} link="/[title]" LinkComp={Link} />
      </div>
    </>
  )
}

export default Home
