import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Page.module.css'
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
  const obj = page.meta?.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
  const title = obj.title
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
            <TextObject textObject={title} />
          </h1>
        </div>
      </header>

      <div className={styles.page}>
        <Blocks blocks={blocks} />
      </div>
    </>
  )
}

export default BlocksPage
