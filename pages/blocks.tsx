import type { GetStaticProps, NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/db.module.css'
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
} from '../src/server'

import {
  Blocks,
  TextObject,
} from '../src/components'

type Props = React.PropsWithChildren & {
  title: null|RichTextItemResponse
  icon: string
  image: string
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTPAGE_ID as string
  const page = await FetchPage(id, 'force')
  let title: null|RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta?.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = ('icon' in page && 'emoji' in page.icon) ? page.icon.emoji : ''
  const image = ('cover' in page) ? page.cover.src : ''
  const blocks = await FetchBlocks(id, page.last_edited_time)

  return {
    props: {
      title,
      icon,
      image,
      blocks,
    }
  }
}

const BlocksPage: NextPage<Props> = ({ title, icon, image, blocks }) => {
  const position = {
    objectPosition: 'center 60%',
  }

  const [exModules, setExModules] = useState({ mermaid, prism })
  useEffect(() => {
    mermaid.initialize({ theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'neutral' })
    setExModules({ mermaid, prism })
  }, [])

  return (
    <>
      <Head>
        <title>Blocks - Notionate</title>
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`} />
      </Head>

      <header className={styles.headerPage}>
        <img className={styles.cover} src={image} style={position} />
        <div className={`${styles.headerInnerPage} ${styles.wrapperPage}`}>
          <div className={styles.icon}>
            {icon}
          </div>
          <h1 className={styles.title}>
            {title && <TextObject textObject={title} />}
          </h1>
        </div>
      </header>

      <div className={`${styles.page} ${styles.wrapperPage}`}>
        <Blocks blocks={blocks} modules={exModules} />
      </div>
    </>
  )
}

export default BlocksPage
