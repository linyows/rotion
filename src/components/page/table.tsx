import React from 'react'
import { TextObject } from './text'
import type {
  BlockObjectResponse,
} from '../../types'

export type TableBlockProps = {
  block: BlockObjectResponse
}

const Td = ({ cell, key }) => {
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

const Th = ({ cell, key }) => {
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

const Tr = ({ children, key }) => {
  return (
    <tr className="table-row" key={key}>
      {children}
    </tr>
  )
}

const TableBlock = ({ block }): React.FC<TableBlockProps> => {
  let rows: JSX.Element[] = []
  const tw = block.table.table_width
  const ch = block.table.has_column_header
  const rh = block.table.has_row_header

  block.children.results.map((v, i) => {
    let columns: JSX.Element[] = []
    v.table_row.cells.map((cells, ii) => {
      cells.map((cell, iii) => {
        if ((i == 0 && ch) || (iii == 0 && rh)) {
          columns.push(Th({ cell, key: `${v.id}-${i}-${ii}-${iii}` }))
        } else {
          columns.push(Td({ cell, key: `${v.id}-${i}-${ii}-${iii}` }))
        }
      })
    })
    rows.push(Tr({ children: columns, key: `${block.id}-${i}` }))
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
