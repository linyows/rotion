import { FetchDatabase } from 'rotion'
import Link from 'next/link'
import styles from './Header.module.css'

export async function Header() {
  const databaseId = process.env.NOTION_DATABASE_ID || ''
  const db = await FetchDatabase({ database_id: databaseId })
  const databaseTitle = db.meta?.title?.[0]?.plain_text || 'Database'

  return (
    <header className={styles.header}>
      <div className={styles.name}>
        <Link href="/">{databaseTitle}</Link>
      </div>
    </header>
  )
}
