import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import {
  FetchBlocks,
  FetchDatabase,
  FetchPage,
  ListBlockChildrenResponseEx,
  PropertyItemObjectResponse,
  RichTextItemResponse,
  TitlePropertyItemObjectResponse,
} from '../../src'
import {
  Blocks,
  TextObject,
} from '../../src/components'

type Props = {
  title: null|RichTextItemResponse
  icon: string
  image: string
  blocks: ListBlockChildrenResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTPAGE_ID as string
  const page = await FetchPage(id)
  let title: null|RichTextItemResponse = null
  if ('list' in page && page.list?.object == 'list') {
    const obj = page.list?.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
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

const Page: NextPage<Props> = ({ title, icon, image, blocks }) => {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="icon">
            {icon}
          </div>
          <h1 className="title">
            {title && TextObject({ textObject: title })}
          </h1>
        </div>
      </header>
      <div className="page">
        {Blocks({ blocks })}
      </div>
      <style jsx>{`
        .title {
          padding: 0;
          margin: 0;
          font-size: 2.2rem;
        }
        .header {
          width: 100%;
          height: 434px;
          margin: 0 0 160px;
          position: relative;
          background-size: cover;
          background-image: url("${image}");
          background-position: left 40%;
          background-repeat: no-repeat;
          background-color: #eee;
        }
        .header-inner {
          font-size: 1rem;
          max-width: 1000px;
          margin: 0 auto;
          padding: 378px 1.5rem 0;
        }
        .icon {
          font-size: 4rem;
        }
        .page {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 0 1.5rem;
        }
      `}</style>
    </>
  )
}

export default Page
