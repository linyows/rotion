import type { GetStaticProps, NextPage } from 'next'
import {
  QueryDatabaseResponseEx,
  FetchDatabase,
  RichTextItemResponse,
} from '../src'
import {
  DBList,
  TextObject,
} from '../src/components'
import Header from '../components/header'

type Props = {
  title: null|RichTextItemResponse
  icon: string
  image: string
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTDB_ID as string
  const db = await FetchDatabase(id)
  const title = ('title' in db.meta) ? db.meta.title[0] : null
  const icon = ('icon' in db.meta && db.meta.icon !== null && db.meta.icon.type === 'emoji') ?  db.meta.icon.emoji : ''
  const image = ('cover' in db.meta && db.meta.cover !== null && db.meta.cover.type === 'external') ? db.meta.cover.external.url : ''

  return {
    props: {
      title,
      icon,
      image,
      db,
    }
  }
}

const Db: NextPage<Props> = ({ title, icon, image, db }) => {
  return (
    <>
      <Header icon={icon} image={image}>
        {title && TextObject({ textObject: title })}
      </Header>
      <div className="db">
        {DBList({ keys: ['Name', 'spacer', 'Tags', 'Date'], db, link: '/database/[id]' })}
      </div>
      <style jsx>{`
        .db {
          max-width: 1800px;
          margin: 2rem auto;
          padding: 0 1.5rem;
        }
      `}</style>
    </>
  )
}

export default Db
