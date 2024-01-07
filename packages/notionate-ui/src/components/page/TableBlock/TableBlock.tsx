import React from 'react'
import RichText from '../TextBlock/RichText/RichText'
import type { TableRowBlockObjectResponse } from 'notionate-pages'
import type { ThTdProps, TrProps, TableBlockProps } from './TableBlock.types'

const Td = ({ cell, key }: ThTdProps) => {
  return (
    <td className="notionate-blocks-table-td" key={key}>
      <div className="notionate-blocks-table-td-inner">
        <RichText textObject={cell} />
      </div>
    </td>
  )
}

const TdH = ({ cell, key }: ThTdProps) => {
  return (
    <td className="notionate-blocks-table-td-header" key={key}>
      <div className="notionate-blocks-table-td-header-inner">
        <RichText textObject={cell} />
      </div>
    </td>
  )
}

const Tr = ({ children, key }: TrProps) => {
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
