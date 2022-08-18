import type { GetStaticProps, NextPage } from 'next'
import {
  QueryDatabaseResponseEx,
  FetchDatabase,
  RichTextItemResponse,
  QueryDatabaseParameters,
} from '../src/server'
import {
  DBList,
  TextBlock,
} from '../src/client'

type Props = {
  title: null|RichTextItemResponse[]
  desc:  null|RichTextItemResponse[]
  icon: string
  image: string
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const params = {
    database_id: process.env.NOTION_TESTDB_ID as string,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      },
    ]
  } as QueryDatabaseParameters
  const db = await FetchDatabase(params)

  const title = ('title' in db.meta) ? db.meta.title : null
  const icon = ('icon' in db.meta && db.meta.icon !== null && db.meta.icon.type === 'emoji') ?  db.meta.icon.emoji : ''
  const image = ('cover' in db.meta && db.meta.cover !== null && db.meta.cover.type === 'external') ? db.meta.cover.external.url : ''
  const desc = ('description' in db.meta) ? db.meta.description : null

  return {
    props: {
      title,
      desc,
      icon,
      image,
      db,
    }
  }
}

const Db: NextPage<Props> = ({ title, desc, icon, image, db }) => {
  return (
    <>
      <header className="header">
        <div className="cover">
        </div>
        <div className="header-inner wrapper">
          <div className="icon">
            {icon}
          </div>
          <h1 className="title">
            {title && TextBlock({ tag: 'span', block: title })}
          </h1>
        </div>
        <p className="desc wrapper">
          {desc && TextBlock({ tag: 'span', block: desc })}
        </p>
      </header>
      <div className="db wrapper">
        {DBList({ keys: ['Name', 'spacer', 'Tags', 'Date'], db, link: '/database/[id]' })}
      </div>
      <style jsx>{`
        .header {
          width: 100%;
          margin: 0;
        }
        .wrapper {
          max-width: 1800px;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .cover {
          width: 100%;
          height: 434px;
          margin: 0;
          position: relative;
          background-size: cover;
          background-image: url("${image}");
          background-position: left 40%;
          background-repeat: no-repeat;
          background-color: #eee;
        }
        .header-inner {
          display: grid;
          width: 100%;
          grid-template: repeat(1, 1fr) / 2.2rem 1fr;
          gap: .8rem;
          margin-top: 2.5rem;
        }
        .title {
          padding: 0;
          margin: 0;
          font-size: 2.2rem;
        }
        .desc {
          margin-top: .5rem;
          font-size: .85rem;
        }
        .icon {
          font-size: 2.2rem;
        }
        .db {
          margin-top: 3rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  )
}

export default Db
