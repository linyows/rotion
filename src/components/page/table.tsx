import React, { ReactElement } from 'react'
import { TextObject } from './text'
import type {
  TableBlockObjectResponseEx,
  TableRowBlockObjectResponse,
  RichTextItemResponse,
} from '../../types'

export type TableBlockProps = {
  block: TableBlockObjectResponseEx
}

export type TrProps = {
  key: string
}

export type ThTdProps = {
  cell: RichTextItemResponse
  key: string
}

const Td: React.FC<ThTdProps> = ({ cell, key }) => {
  return (
    <td className="table-cell" key={key}>
      <div className="table-cell-div">
        <TextObject textObject={cell} />
      </div>
      <style jsx>{`
        .table-cell {
          border: 1px solid #EEE;
          margin: 0;
          padding: 0;
        }
        .table-cell-div {
          padding: .2rem .8rem;
        }
      `}</style>
    </td>
  )
}

const Th: React.FC<ThTdProps> = ({ cell, key }) => {
  return (
    <th className="table-cell" key={key}>
      <div className="table-cell-div">
        <TextObject textObject={cell} />
      </div>
      <style jsx>{`
        .table-cell {
          border: 1px solid #EEE;
          background-color: #F5F5F5;
          margin: 0;
          padding: 0;
        }
        .table-cell-div {
          padding: .2rem .8rem;
        }
      `}</style>
    </th>
  )
}

const Tr: React.FC<TrProps> = ({ children, key }) => {
  return (
    <tr className="table-row" key={key}>
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
    <>
      <div className="table">
        <table className="table-table">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-table {
          border-collapse: collapse;
          border-spacing: 0;
          font-size: .9rem;
        }
      `}</style>
    </>
  )
}

export default TableBlock
