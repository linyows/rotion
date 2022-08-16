import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

import {
  QueryDatabaseResponseEx,
  FetchDatabase,
} from '../../src'

import { DBList } from '../../src/components'

type Props = {
  db: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = process.env.NOTION_TESTDB_ID as string
  const db = await FetchDatabase(id)

  return {
    props: {
      db
    }
  }
}

const Db: NextPage<Props> = ({ db }) => {
  return (
    <>
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
