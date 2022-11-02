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

const TdH: React.FC<ThTdProps> = ({ cell, key }) => {
  return (
    <td className="notionate-blocks-table-td-header" key={key}>
      <div className="notionate-blocks-table-td-header-inner">
        <TextObject textObject={cell} />
      </div>
    </td>
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

  const rows: JSX.Element[] = []
  // const tw = block.table.table_width
  // column header ||
  const ch = block.table.has_column_header
  // row header =
  const rh = block.table.has_row_header

  block.children.results.map((vv, i) => {
    const v = vv as TableRowBlockObjectResponse
    const columns: JSX.Element[] = []
    if (v.table_row === undefined) {
      return ''
    }
    v.table_row.cells.map((cells, ii) => {
      cells.map((cell, iii) => {
        const key = `${v.id}-${i}-${ii}-${iii}`
        if ((i === 0 && ch) || (ii === 0 && rh)) {
          columns.push(TdH({ cell, key }) || <></>)
        } else {
          columns.push(Td({ cell, key }) || <></>)
        }
        return ''
      })
      return ''
    })
    const key = `${block.id}-${i}`
    rows.push(Tr({ children: columns, key }) || <></>)
    return ''
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
