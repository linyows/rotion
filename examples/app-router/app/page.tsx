import { FetchDatabase } from 'rotion'
import { ClientLink } from './compornents/ClientLink'
import { Table } from './compornents/Table'
import styles from './page.module.css'

export async function generateMetadata() {
  const databaseId = process.env.NOTION_DATABASE_ID || ''
  const db = await FetchDatabase({ database_id: databaseId })
  return {
    title: db.meta?.title?.[0]?.plain_text || 'Database',
  }
}

export default async function Home() {
  const description = 'This is a rotion example of the Notion database.'
  const databaseId = process.env.NOTION_DATABASE_ID || ''
  const db = await FetchDatabase({ database_id: databaseId })
  const keys = ['Title', 'Tags', 'Date']
  return (
    <div className={styles.container}>
      <p className={styles.description}>{description}</p>
      <Table keys={keys} db={db} link={ClientLink} />
    </div>
  )
}
