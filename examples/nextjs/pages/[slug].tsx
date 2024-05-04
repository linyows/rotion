import {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
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
  RichText,
  Link as NLink,
} from 'rotion/ui'
import Header from '@/components/Header'
import styles from '@/styles/Page.module.css'

type Params = {
  slug: string
}

type Props = {
  title?: null | RichTextItemResponse
  icon?: string
  blocks?: FetchBlocksRes
  breadcrumbs?: Breadcrumb[]
}

const pages = [
  { slug: 'bookmarks',          id: '348bc8ba092945028865663e981038a9' },
  { slug: 'breadcrumb',         id: '774af4dfdf494a2c969d97701bfb4548' },
  { slug: 'bulleted-list-item', id: 'b745084090d94f99ad6da1cb049ef282' },
  { slug: 'button',             id: '037685aa35584e2fae29c8857758a5d4' },
  { slug: 'callout',            id: '38d8251cd03a45bf91613e2ef8a82c48' },
  { slug: 'child-database',     id: '3ddb7259d1c740a48cde3961a6dff1ec' },
  { slug: 'child-page',         id: '0f58cdadb5db49fd8479299a220ac347' },
  { slug: 'code',               id: '72fb9fd9ff5247efbe6af4cf151562f5' },
  { slug: 'column',             id: '41c412cca42e44f8a38aa9a984775d99' },
  { slug: 'divider',            id: '901a1f547b4f4e4685ceb4a6ccd8259e' },
  { slug: 'embed',              id: '24a04292e4214a8a92cfa53f1f59bdd5' },
  { slug: 'equation',           id: '1f8ab7d4c3474251b91f04ff70184a2d' },
  { slug: 'file',               id: 'b5e98f31b70543cdbf64db968395ab60' },
  { slug: 'headings',           id: '93997cee371044c2936bb4e911764cd2' },
  { slug: 'image',              id: 'f882184561d44eed89769bbfb867a6c7' },
  { slug: 'link-preview',       id: '0c312b1be91944358768e17bf185a10e' },
  { slug: 'mention',            id: '5787b9e8fac04b008c156c865f3b7d4e' },
  { slug: 'numbered-list-item', id: '5437f951dbb848458ea9bac7dbdacedc' },
  { slug: 'paragraph',          id: '0521b34c54f0476c95a46b82bc290ac2' },
  { slug: 'pdf',                id: 'f4f906b4813140768762cf6e06cb6df2' },
  { slug: 'quote',              id: '314fffb219c74ffab1e38b890a0de908' },
  { slug: 'rich-text',          id: '41af4a22964d4c6aadef7b6921d764bc' },
  { slug: 'video',              id: '2dc517b26c89474681343f7f526914df' },
  { slug: 'synced-block',       id: '8464d85d16514b6696dd7d9c6a00d784' },
  { slug: 'table',              id: 'a2af31d8e7254a17883fb6100d7d074a' },
  { slug: 'table-of-contents',  id: 'e5247516541d45c7b8c5b21937bad83e' },
  { slug: 'to-do',              id: '4d438f5ea4fa43f282153040fe7e1ff5' },
  { slug: 'toggle',             id: '038f54d55b684bb0b02f3765dec8f4a9' },
]

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: pages.map(v => ({ params: { slug: v.slug } }) ),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const id = pages.find(v => v.slug === params?.slug)?.id
  if (!params?.slug || !id) {
    return {
      props: {},
      redirect: {
        destination: '/404'
      }
    }
  }

  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
  let title: null | RichTextItemResponse = null
  if ('meta' in page && page.meta?.object === 'list') {
    const obj = page.meta.results.find(v => v.type === 'title') as TitlePropertyItemObjectResponse
    title = obj.title
  }
  const icon = page.icon!.src
  const blocks = await FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
  const breadcrumbs = await FetchBreadcrumbs({ id, type: 'page_id' })

  return {
    props: {
      title,
      icon,
      blocks,
      breadcrumbs,
    }
  }
}

export default function BlockPage({ title, icon, blocks, breadcrumbs }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{title?.plain_text} Block - Rotion</title>
        <link rel="icon" type="image/svg+xml" href={icon} />
      </Head>

      <Header breadcrumbs={breadcrumbs!} breadcrumb_hrefs={['/']} />

      <div className={styles.layout}>
        <span></span>
        <div>
          <header className={styles.header}>
            <div className={styles.icon}>
              <Image src={icon!} width={78} height={78} alt="Icon" />
            </div>
            <h1 className={styles.title}>
              {title && <RichText textObject={title} />}
            </h1>
          </header>

          <div className={styles.page}>
            <Page blocks={blocks!} href="/[title]" link={Link as NLink} />
          </div>
        </div>
        <span></span>
      </div>
    </>
  )
}
