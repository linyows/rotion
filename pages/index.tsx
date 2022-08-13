import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
//import Image from 'next/image'
import {
  FetchBlocks,
  FetchDatabase,
  FetchPage,
  ListBlockChildrenResponseEx,
  QueryDatabaseResponse,
} from '../src'
import {
  Blocks,
  DBList,
  TextBlock,
} from '../src/components'

type Props = {
  title: string
  icon: string
  image: string
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTPAGE_ID as string
  const blocks = await FetchBlocks(id)
  const page = await FetchPage(id)

  const title = page.properties.title.title
  const icon = page.icon.emoji
  const image = page.cover.src

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
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="icon">
            {icon}
          </div>
          <h1 className="title">
            <TextBlock tag="span" block={title} />
          </h1>
        </div>
        <img className="image" src={image} width="100%" />
      </header>

      <div className="page">
        <Blocks blocks={blocks} />
      </div>
      <style jsx>{`
        .title {
          padding: 0;
          margin: 0;
        }
        .header {
          width: 100%;
          height: 300px;
          margin: 0 0 160px;
          position: relative;
        }
        .header-inner {
          font-size: 1rem;
          max-width: 1000px;
          margin: 0 auto;
          padding: 240px 0 0;
        }
        .icon {
          font-size: 4rem;
        }
        .image {
          width: 100%;
          height: 300px;
          position: absolute;
          top: 0;
          left: 0;
          oveflow: hidden;
          z-index: -1;
        }
        .page {
          max-width: 1000px;
          margin: 2rem auto;
        }
      `}</style>
    </>
  )
}

export default Home
