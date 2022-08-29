import React from 'react'
import { TextObject } from './text'
import type {
  TableBlockObjectResponseEx,
  TableRowBlockObjectResponse,
  RichTextItemResponse,
} from '../../server/types'

export type TableBlockProps = {
  block: TableBlockObjectResponseEx
}

export type TrProps = React.PropsWithChildren & {
  key: string
}

export type ThTdProps = {
  cell: RichTextItemResponse
  key: string
}

const Td: React.FC<ThTdProps> = ({ cell, key }) => {
  return (
    <td className="notionate-blocks-table-td" key={key}>
      <div className="notionate-blocks-table-td-inner">
        <TextObject textObject={cell} />
      </div>
    </td>
  )
}

const Th: React.FC<ThTdProps> = ({ cell, key }) => {
  return (
    <th className="notionate-blocks-table-th" key={key}>
      <div className="notionate-blocks-table-th-inner">
        <TextObject textObject={cell} />
      </div>
    </th>
  )
}

const Tr: React.FC<TrProps> = ({ children, key }) => {
  return (
    <tr className="notionate-blocks-table-tr" key={key}>
      {children}
    </tr>
  )
}

const TableBlock: React.FC<TableBlockProps> = ({ block }) => {
  if (!block.table || !block.children) {
    return <></>
  }

  let rows: JSX.Element[] = []
  const tw = block.table.table_width
  const ch = block.table.has_column_header
  const rh = block.table.has_row_header

  block.children.results.map((vv, i) => {
    const v = vv as TableRowBlockObjectResponse
    let columns: JSX.Element[] = []
    if (v.table_row === undefined) {
      return
    }
    v.table_row.cells.map((cells, ii) => {
      cells.map((cell, iii) => {
        const key = `${v.id}-${i}-${ii}-${iii}`
        if ((i == 0 && ch) || (iii == 0 && rh)) {
          columns.push(Th({ cell, key }) || <></>)
        } else {
          columns.push(Td({ cell, key }) || <></>)
        }
      })
    })
    const key = `${block.id}-${i}`
    rows.push(Tr({ children: columns, key }) || <></>)
  })

  return (
    <div className="notionate-blocks-table">
      <table className="notionate-blocks-table-table">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default TableBlock
