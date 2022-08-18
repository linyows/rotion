import type { GetStaticProps, NextPage } from 'next'
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
} from '../src/client'
import Header from '../components/header'

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
  if ('meta' in page && page.meta?.object == 'list') {
    const obj = page.meta?.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
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
      <Header icon={icon} image={image}>
        {title && TextObject({ textObject: title })}
      </Header>
      <div className="page">
        {Blocks({ blocks })}
      </div>
      <style jsx>{`
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
