'use client'

import { Table as RotionTable } from 'rotion/ui'
import type { QueryDatabaseResponseEx } from 'rotion'
import type { Link } from 'rotion/ui'
import styles from './Table.module.css'

export interface TableProps {
  keys: string[]
  db: QueryDatabaseResponseEx
  link?: Link
}

export const Table = ({ keys, db, link }: TableProps) => {
  const options = {
    href: {
      Title: '/[id]'
    },
    link
  }

  return (
    <div className={styles.table}>
      <RotionTable keys={keys} db={db} options={options} />
    </div>
  )
}
