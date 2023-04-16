import { useEffect, useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Page.module.css'
import mermaid from 'mermaid'
import prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-sql'
import {
  FetchPage,
  FetchBlocks,
  // types
  RichTextItemResponse,
  ListBlockChildrenResponseEx,
  TitlePropertyItemObjectResponse,
} from 'notionate'
import {
  TextObject,
  Blocks,
} from 'notionate/dist/components'

type Props = React.PropsWithChildren & {
  title: null|RichTextItemResponse
  icon: string
  image: string
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTPAGE_ID as string
  const page = await FetchPage(id)
  let title: null|RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta?.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = ('emoji' in page.icon) ? page.icon.emoji : ''
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

const BlocksPage: NextPage<Props> = ({ title, icon, image, blocks }) => {
  const bg = {
    backgroundImage: `url("${image}")`
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
        <Blocks blocks={blocks} modules={exModules} />
      </div>
    </>
  )
}

export default BlocksPage
