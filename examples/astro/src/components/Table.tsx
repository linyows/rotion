import { Table as RotionTable } from 'rotion/ui'
import type { QueryDatabaseResponseEx } from 'rotion'

export interface TableProps {
  keys: string[]
  db: QueryDatabaseResponseEx
}

export default function Table({ keys, db }: TableProps) {
  const options = {
    href: {
      Title: '/[id]'
    }
  }

  return <RotionTable keys={keys} db={db} options={options} />
}
