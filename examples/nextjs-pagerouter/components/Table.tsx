import { Table as RotionTable } from 'rotion/ui'
import type { QueryDatabaseResponseEx } from 'rotion'
import Link from 'next/link'
import type { Link as NLink } from 'rotion/ui'
import styles from './Table.module.css'

export interface TableProps {
  keys: string[]
  db: QueryDatabaseResponseEx
}

export const Table = ({ keys, db }: TableProps) => {
  const options = {
    href: {
      Title: '/[id]'
    },
    link: Link as NLink
  }

  return (
    <div className={styles.table}>
      <RotionTable keys={keys} db={db} options={options} />
    </div>
  )
}
